import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoGasolinerasComponent } from './components/listado-gasolineras/listado-gasolineras.component';
import { provideHttpClient } from '@angular/common/http';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoogleMapsPipePipe } from './pipes/google-maps-pipe.pipe';
import { GoogleMapsRoutePipePipe } from './pipes/google-maps-route-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListadoGasolinerasComponent,
    GoogleMapsPipePipe,
    GoogleMapsRoutePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatAutocompleteModule,
     ReactiveFormsModule,
      MatFormFieldModule
        ],
  providers: [provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
