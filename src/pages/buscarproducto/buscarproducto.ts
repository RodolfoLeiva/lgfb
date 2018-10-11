import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Producto } from '../../models/producto';
import { trigger,style,transition,animate,state } from '@angular/animations';
import { productoservice } from '../../services/producto';
import { opcionProducto } from '../../models/opcionproducto';
/**
 * Generated class for the BuscarproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscarproducto',
  templateUrl: 'buscarproducto.html',
    animations: [
      trigger('animacion', [
        state('inactive',
          style({ opacity: 0, transform: 'translateY(-75%)' })),
        state('active',
          style({ opacity: 1, transform: 'translateY(0%)' })),
        transition('inactive => active', animate('300ms')),
        transition('active => inactive', animate('300ms'))
      ])

    ]
})
export class BuscarproductoPage {
public producto : Producto  ;
public productos: Producto [];
public categoria : opcionProducto[] ;
public color : opcionProducto[] ;
public tamano : opcionProducto[] ;
public talla : opcionProducto[] ;
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public _productoservice: productoservice, public alertctrl: AlertController) {
    this.opcionesfuncion();
   this.producto = new Producto;
   // this.producto.codigo = "12345678912345";
   // this.producto.categoria = "01 Vestidos";
   // this.producto.color = "01 Blanco";
   // this.producto.tamano = "1 Corto";
   // this.producto.observaciones = "";
   // this.producto.creadoel = Date.now();
   // this.producto.creadopor = "rodolfoleiva@gmail.com";
   // this.producto.editadoel = Date.now();
   // this.producto.estatus = true;
  //  this.producto.talla = "45";

  } 

  ionViewDidLoad() {
    
  }
  opcionesfuncion(){
        this._productoservice.traeopcion('color').subscribe((data:any) => {
             this.color = data.opcionproducto
         });
        this._productoservice.traeopcion('categoria').subscribe((data:any) => {
               this.categoria = data.opcionproducto});
        this._productoservice.traeopcion('tamano').subscribe((data:any) => {
              this.tamano = data.opcionproducto});
        this._productoservice.traeopcion('talla').subscribe((data:any) => {
              this.talla = data.opcionproducto});
}
buscarfuncion() {
    this._productoservice.traerproductos(this.producto).subscribe((data: any) => {
      this.productos = data.producto
      console.log(this.productos)
    },
      error => {
        var errormensaje = <any>error;
        if (errormensaje.error.message != null) {
          this.alerta(errormensaje.error.message);
        } else {
          this.alerta('Error al conectar servidor api');
        }

      }
  );
  }

  alerta(mensaje) {

    let alertita = this.alertctrl.create({
      title: 'Alerta',
      message: mensaje,
      buttons: ['OK']

    });
    alertita.present();
  }
}
