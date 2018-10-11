import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
public user : User;
public identidad : boolean = false;
  constructor() {

  this.user = new User ;

   }

  ngOnInit() {
  }

}
