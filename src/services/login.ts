import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from './global';
import { User } from '../models/user';
import { Userconectado } from '../models/userconectado';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable ()
export class loginservice {
  public url:string;
  public user : User;
  public usuarioconectado: Userconectado;
  public conectado = new BehaviorSubject<boolean>(false);
  cast = this.conectado.asObservable();


  constructor (private http: HttpClient,private storage: Storage){
    this.url = GLOBAL.url
    this.user = new User;
    this.user.nombre = "";
    this.usuarioconectado =  new Userconectado;
  }
  signup  (user_to_login):Observable<any>{
    return  this.http.post(this.url+'/login',
        {
          email:user_to_login.email,
          password: user_to_login.password
        })
  }

 conectado_fun() {
  return Observable.create ((usuarioconectado)=>{
    if (!this.usuarioconectado.conectado) {
         this.storage.get('user').then((val) => {
           if (val != null) {
             this.usuarioconectado.user = val;
              this.usuarioconectado.conectado = true;
             this.conectado.next(this.usuarioconectado.conectado);
             console.log (this.conectado.value)
             usuarioconectado.next(this.usuarioconectado);
           }else {
             this.usuarioconectado.conectado = false;
             this.conectado.next(this.usuarioconectado.conectado);
             console.log('this.conectado');
             usuarioconectado.next(this.usuarioconectado);
           }
         });
    }else {
      usuarioconectado.next(this.usuarioconectado)
      this.conectado.next(this.usuarioconectado.conectado);
    }


    });
  }

 salir (){
   this.conectado.next(false);
    this.storage.clear().then((val) => {
    console.log('borrado', val);
    window.location.reload();
  });
 }
 guardarconeccion(guardarlocal,user){
   console.log ('pase');
    if (guardarlocal) {
      this.storage.set('user', user);
    }
    this.usuarioconectado.conectado = true;
    this.usuarioconectado.user = user;
    this.conectado.next(true);
  }
}
