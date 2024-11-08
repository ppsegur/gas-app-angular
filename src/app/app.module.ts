import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoGasolinerasComponent } from './components/listado-gasolineras/listado-gasolineras.component';
import { provideHttpClient } from '@angular/common/http';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { AutocompleteFilterExample } from './components/autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListadoGasolinerasComponent,
    AutocompleteFilterExample
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    //ListadoGasolinerasComponent,
    //AutocompleteFilterExample
  ],
  providers: [provideHttpClient(), provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
