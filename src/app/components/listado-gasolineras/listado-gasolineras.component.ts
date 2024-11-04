import { Component, OnInit } from '@angular/core';
import { ListaEessprecio } from '../../interfaces/gasolinera.interface';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-listado-gasolineras',
  templateUrl: './listado-gasolineras.component.html',
  styleUrl: './listado-gasolineras.component.css'
})
export class ListadoGasolinerasComponent implements OnInit{

  listadoGasolineras: ListaEessprecio[] = [];

  constructor(private gasolineraSvc: GasolineraService) { }
  
  ngOnInit(): void {
    this.gasolineraSvc.getGasolineras().subscribe(respuesta => {
      this.listadoGasolineras = respuesta.results;
    })
  }

}
