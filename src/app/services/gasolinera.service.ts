import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gasolinera, Municipio, MunicipioResponse } from '../interfaces/gasolinera.interface';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasolineraService {

  constructor(private http: HttpClient) { }

  
  getGasList() {
    return this.http.get(
      'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
    );
  }
  filterGasList(
    gasolineras: Gasolinera[],
    tipoCombustible: string,
    precioMin: number,
    precioMax: number,
    postalCode: string,
    provincias: string[]
  ): Gasolinera[] {
    return gasolineras.filter((gasolinera) => {
      const precio =
        tipoCombustible === 'gasolina'
          ? gasolinera.price95
          : gasolinera.priceDiesel;
      const matchesPostalCode = postalCode ? gasolinera.postalCode === postalCode : true;
      const matchesProvincia = provincias.length > 0 ? provincias.some(provincia => gasolinera.postalCode.startsWith(provincia)) : true;
      return (
        precio >= precioMin &&
        precio <= precioMax &&
        matchesPostalCode &&
        matchesProvincia
      );
    });
  }

  filterGasListByProvincia() {
    return this.http.get<MunicipioResponse>('http://localhost:3000/gas-poblation-list');
  }

}
