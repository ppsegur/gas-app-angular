import { Component, OnInit } from '@angular/core';
import { Gasolinera, ListaEessprecio } from '../../interfaces/gasolinera.interface';
import { GasolineraService } from '../../services/gasolinera.service';
import { MunicipioService } from '../../services/municipio.service';
import { Municipio } from '../../interfaces/municipio.interface';
import { AutocompleteFilterExample } from "../autocomplete/autocomplete.component";

@Component({
  selector: 'app-listado-gasolineras',
  templateUrl: './listado-gasolineras.component.html',
  styleUrl: './listado-gasolineras.component.css',
  //standalone: true,
  // imports: [AutocompleteFilterExample]
})
export class ListadoGasolinerasComponent implements OnInit {

    listadoMunicipios: Municipio[] = [];
    listadoGasolineras: Gasolinera[] = [];
    originalListadoGasolineras: Gasolinera[] = [];
    tipoCombustible: string = 'gasolina';
    precioMin: number = 0;
    precioMax: number = 2;
    postalCode: string = '';
    noResults: boolean = false;
    provincias: { code: string, name: string }[] = [
      { code: '01', name: 'Araba/Álava' }, { code: '02', name: 'Albacete' }, 
      // ... add all other provinces here ...
      { code: '52', name: 'Melilla' }
    ];
    selectedProvincias: string[] = [];
  
    constructor(private gasService: GasolineraService,
      private municipioService: MunicipioService) {}
  
    ngOnInit() {
      this.loadGasList();
    }
  
    private loadGasList() {
      this.gasService.getGasList().subscribe((respuesta) => {
        const respuestaEnString = JSON.stringify(respuesta);
        let parsedData;
        try {
          parsedData = JSON.parse(respuestaEnString);
          let arrayGasolineras = parsedData['ListaEESSPrecio'];
          this.originalListadoGasolineras = this.cleanProperties(arrayGasolineras);
          this.listadoGasolineras = [...this.originalListadoGasolineras];
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
          parseFloat(gasolineraChusquera['Precio Gasolina 95 E5'].replace(',', '.')),
          parseFloat(gasolineraChusquera['Precio Gasoleo A'].replace(',', '.')),
          gasolineraChusquera['C.P.']
        );
        newArray.push(gasolinera);
      });
      return newArray;
    }
  
    getProvinciaName(postalCode: string): string {
      const provincia = this.provincias.find(prov => postalCode.startsWith(prov.code));
      return provincia ? provincia.name : 'Desconocido';
    }
  
    onProvinciaChange(event: any) {
      const provinciaCode = event.target.value;
      if (event.target.checked) {
        this.selectedProvincias.push(provinciaCode);
      } else {
        this.selectedProvincias = this.selectedProvincias.filter(code => code !== provinciaCode);
      }
    }
  
    filtrarGasolineras() {
      this.listadoGasolineras = this.gasService.filterGasList(
        this.originalListadoGasolineras,
        this.tipoCombustible,
        this.precioMin,
        this.precioMax,
        this.postalCode,
        this.selectedProvincias
      );
      this.noResults = this.listadoGasolineras.length === 0;
    }

    filtrarGasolinerasPorProvincia(): Municipio[] {
      this.municipioService.filterGasListByProvincia().subscribe((respuesta) => {
        this.listadoMunicipios = respuesta.results;
        /*return this.listadoMunicipios = this.listadoMunicipios.filter((municipio) => {
          return this.selectedProvincias.includes(municipio.municipio_nombre);*/
      });
      return this.listadoMunicipios;
    }
  }
