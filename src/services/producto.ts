import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from './global';
import { Producto } from '../models/producto';
import { opcionProducto } from '../models/opcionproducto';
import { Observable } from 'rxjs';

@Injectable ()
export class productoservice {
  public url:string;
  public producto:Producto;
  public opcionproducto:opcionProducto;
  public productomaestro :Producto;
  constructor (private http: HttpClient){
    this.url = GLOBAL.url
    this.producto = new Producto ;
    this.producto.codigo = "(Autogenerado)";
    this.producto.estatus = true;
    this.opcionproducto =  new opcionProducto ;
    this.productomaestro = new  Producto;
  
    this.productomaestro = this.producto
  }

  traeopcion(tipo):Observable<any>{
    return this.http.post(this.url+'/getopcionesp',
        {
        tipo :tipo
        })
  }
  grabarproducto(producto):Observable<any>{
    return this.http.post(this.url+'//crearproducto',
        producto)
  }
  traerproductos(producto): Observable<any>{
    return this.http.post(this.url + '/getoproducto',
    {
      categoria: producto.categoria,
      color: producto.color,
      tamano: producto.tamano,
      talla: producto.talla,
    })
}

}
