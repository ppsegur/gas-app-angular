import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
=======
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
>>>>>>> ddae1ccca943290c9457a8b61dfb72a6f6e2a84c

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
