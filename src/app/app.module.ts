import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { loginservice } from '../services/login';
import { productoservice } from '../services/producto';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductoPage } from '../pages/producto/producto';
import { BuscarproductoPage} from '../pages/buscarproducto/buscarproducto';
import { LoginComponent } from '../components/login/login';
import { MostrarproductoComponent } from '../components/mostrarproducto/mostrarproducto';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProductoPage,
     BuscarproductoPage,
     LoginComponent,
     MostrarproductoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProductoPage,
    BuscarproductoPage,
    MostrarproductoComponent,
    LoginComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    loginservice,
    productoservice,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
