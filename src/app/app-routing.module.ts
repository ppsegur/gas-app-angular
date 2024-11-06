import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoGasolinerasComponent } from './components/listado-gasolineras/listado-gasolineras.component';

const routes: Routes = [
  {path: 'listado-gasolineras', component: ListadoGasolinerasComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'listado-gasolineras'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
