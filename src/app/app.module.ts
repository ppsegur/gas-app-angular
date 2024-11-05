import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoGasolinerasComponent } from './components/listado-gasolineras/listado-gasolineras.component';
import { provideHttpClient } from '@angular/common/http';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListadoGasolinerasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [provideHttpClient(), provideAnimationsAsync('noop')],
  bootstrap: [AppComponent]
})
export class AppModule { }
