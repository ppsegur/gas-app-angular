import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoGasolinerasComponent } from './components/listado-gasolineras/listado-gasolineras.component';
import { provideHttpClient } from '@angular/common/http';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
>>>>>>> 2a0f2072f3b482038b9450bfdf56a09b0a2835a9

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListadoGasolinerasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [provideHttpClient(), provideAnimationsAsync('noop')],
  bootstrap: [AppComponent]
})
export class AppModule { }
