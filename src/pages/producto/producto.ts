import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer } from 'ionic-angular';
import { Producto } from '../../models/producto';
import { opcionProducto } from '../../models/opcionproducto';
import { productoservice } from '../../services/producto';
import { loginservice } from '../../services/login';
import { AlertController } from 'ionic-angular';
import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
import {  BuscarproductoPage } from '../buscarproducto/buscarproducto';


@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
  animations: [
    trigger('animacion', [
      state('inactive',
      style({opacity: 0, transform: 'translateY(-75%)', offset: 0})),
      state('active',
            style({opacity: 1, transform: 'translateY(0%)',     offset: 1.0})
          ),
      transition('inactive => active', animate('100ms')),
      transition('active => inactive', animate('100ms'))
    ])

  ]
})
export class ProductoPage {
  public titulo : String;
  public categoria : opcionProducto[] ;
  public color : opcionProducto[] ;
  public tamano : opcionProducto[] ;
  public talla : opcionProducto[] ;
  public producto : Producto ;
  public estatustagle : String;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertctrl:AlertController ,public _productoservice:productoservice,public _loginservice:loginservice) {
    this.estatustagle = 'inactive'
    setTimeout(() => {
      this.estatustagle = 'active'
    },
      300);
    this.producto = new Producto()
    this.titulo = "Producto Nuevo"
    this.producto = this._productoservice.productomaestro;
    console.log (this.estatustagle)
    this.opcionesfuncion();
    this.producto.creadoel  = Date.now();
    this.producto.editadoel  = Date.now();
    this.producto.creadopor = _loginservice.usuarioconectado.user.email;

  }
  opcionesfuncion(){

        this._productoservice.traeopcion('color').subscribe((data:any) => {
             this.color = data.opcionproducto
           console.log(this.color)
         });
        this._productoservice.traeopcion('categoria').subscribe((data:any) => {
               this.categoria = data.opcionproducto});
        this._productoservice.traeopcion('tamano').subscribe((data:any) => {
              this.tamano = data.opcionproducto});
        this._productoservice.traeopcion('talla').subscribe((data:any) => {
              this.talla = data.opcionproducto});

}

 nuevo (fab: FabContainer){
  // this.navCtrl.setRoot(this.navCtrl.getActive().component)ç
  if (fab!=null){
    fab.close();
  }
   console.log(this.estatustagle);
  this.estatustagle = this.estatustagle === 'active' ? 'inactive' : 'active';

  this.producto.codigo = "(Autogenerado)";
  this.producto.categoria = "";
  this.producto.color = "";
  this.producto.tamano = "";
  this.producto.observaciones = "";
  this.producto.creadoel = Date.now();
  this.producto.creadopor = this._loginservice.usuarioconectado.user.email;
  this.producto.editadoel =  Date.now();
  this.producto.estatus = true;
  this.producto.talla  = "";
  setTimeout(() =>
{
  this.estatustagle = this.estatustagle === 'active' ? 'inactive' : 'active';
},
200);


 }
 grabarfuncion(){
     this._productoservice.grabarproducto(this.producto).subscribe(
         (data:any) => {
           var codigo = data.producto.codigo;
           this.producto = data.producto;
           this.nuevo(null);
           this.alerta('producto guardado con exito, codigo : '+ codigo);
           console.log(data)
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

 openbuscar() {
this.navCtrl.push( BuscarproductoPage);
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
