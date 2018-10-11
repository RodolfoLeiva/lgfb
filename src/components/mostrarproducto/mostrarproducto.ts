import { productoservice } from '../../services/producto';
import { Component, Input } from '@angular/core';
import { Producto } from '../../models/producto';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
@Component({
  selector: 'mostrarproducto',
  templateUrl: 'mostrarproducto.html'
})
export class MostrarproductoComponent {
  @Input() public producto: Producto;
  constructor(public _productoservice: productoservice) {
    
  }

}
