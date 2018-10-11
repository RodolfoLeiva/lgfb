import { Component} from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { loginservice } from '../../services/login';
import { trigger,style,transition,animate,state } from '@angular/animations';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  animations: [
    trigger('animacion', [
      state('inactive',
      style({opacity: 0, transform: 'translateY(-75%)'})),
      state('active',
            style({opacity: 1, transform: 'translateY(0%)'})),
      transition('inactive => active', animate('300ms')),
      transition('active => inactive', animate('300ms'))
    ])

  ]
})
export class LoginComponent {
public user : User;
public mostrarlogin : boolean;
public guardarenlocal : boolean =true;
public mesajeerror : string;
public estatustagle : String;

  constructor(private toastCtrl: ToastController, public alertctrl:AlertController, public _loginservice:loginservice) {
  this.user = new User ;
  this.estatustagle = 'inactive' 
  setTimeout(() =>
{
  this.estatustagle = 'active'
},
200);
  this.guardarenlocal = true;
  this._loginservice.conectado_fun().subscribe(usuarioconectado => {
  if  (!usuarioconectado.conectado) {
    this.mostrarlogin = true;

  }else {
    this.mostrarlogin = false;
    this.user= usuarioconectado.user;
    this.presentToast('Bienvenid@ nuevamente ' + this.user.nombre);
  };
  });

  }

  loginfuncion(){
      this._loginservice.signup(this.user).subscribe(
          (data:any) => {
            this.user = data.message
            this._loginservice.guardarconeccion(this.guardarenlocal,this.user)
           this.presentToast('Bienvenid@ nuevamente ' + this.user.nombre);
          },
          error => {
            var errormensaje = <any>error;
            if (errormensaje.error.message != null) {
              this.alerta(errormensaje.error.message);
            }else {
              this.alerta('Error al conectar servidor api');
            }

            }

        );
  }
  presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1500,
      position: 'middle'
    });

    this.estatustagle = this.estatustagle === 'active' ? 'inactive' : 'active';

    toast.onDidDismiss(() => {
      this.mostrarlogin = false
    });

    toast.present();
  }

  alerta (mensaje){

  let alertita = this.alertctrl.create({
    title :'Alerta',
    message: mensaje,
    buttons: ['OK']

  });
  alertita.present();
}
}
