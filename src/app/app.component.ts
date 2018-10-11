import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { loginservice } from '../services/login';
import { AlertController } from 'ionic-angular';

import { ProductoPage } from '../pages/producto/producto';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit{
  public mostrarmenu : boolean;


  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public alertCtrl: AlertController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,  public _loginservice:loginservice)
  {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Producto', component: ProductoPage },
    ];

  }
ngOnInit() {
  this.mostrarmenu = true;
  console.log ('hola' + this.mostrarmenu)
  this._loginservice.cast.subscribe(conectado => this.mostrarmenu = conectado);
console.log ('hola' + this.mostrarmenu)
console.log ()
}
  showConfirm() {
    console.log ('hola' + this.mostrarmenu)
    console.log (this._loginservice.usuarioconectado)
     const confirm = this.alertCtrl.create({
       title: 'Confirmar',
       message: '¿Seguro desea Salir?',
       buttons: [
         {
           text: 'Si',
           handler: () => {
             this._loginservice.salir();
             console.log('Disagree clicked');
           }
         },
         {
           text: 'No',
           handler: () => {
             console.log('Agree clicked');
           }
         }
       ]
     });
     confirm.present();
   }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
