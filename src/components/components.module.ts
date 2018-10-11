import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { MostrarproductoComponent } from './mostrarproducto/mostrarproducto';
@NgModule({
	declarations: [LoginComponent,
    MostrarproductoComponent],
	imports: [],
	exports: [LoginComponent,
    MostrarproductoComponent]
})
export class ComponentsModule {}
