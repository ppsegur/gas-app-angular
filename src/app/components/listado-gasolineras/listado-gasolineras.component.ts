import { Component, OnInit } from '@angular/core';
import { Gasolinera, ListaEessprecio } from '../../interfaces/gasolinera.interface';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-listado-gasolineras',
  templateUrl: './listado-gasolineras.component.html',
  styleUrl: './listado-gasolineras.component.css'
})
export class ListadoGasolinerasComponent implements OnInit {

  listadoGasolineras: Gasolinera[] = [];
  filteredGasolineras: Gasolinera[] = []; 
  showFilter: boolean = false;
  selectedPrice: number = 1.50; // Precio inicial del slider

  constructor(private gasService: GasolineraService) {}

  ngOnInit() {
    this.gasService.getGasList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras);
        this.filteredGasolineras = [...this.listadoGasolineras]; // Inicializa filteredGasolineras
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
      let gasolinera = new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        gasolineraChusquera['Precio Gasolina 95 E5'],
        gasolineraChusquera['Precio Gasoleo A'],
        gasolineraChusquera['C.P.']
      );

      newArray.push(gasolinera);
    });
    return newArray;
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  filterGasolineras() {
    this.filteredGasolineras = this.listadoGasolineras.filter((gasolinera) => {
      return gasolinera.price95 <= this.selectedPrice;
    });
  }
}
