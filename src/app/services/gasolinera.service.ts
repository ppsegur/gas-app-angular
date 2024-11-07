import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gasolinera } from '../interfaces/gasolinera.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasolineraService {
 
  private comunidadesUrl = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/';
  constructor(private http: HttpClient) { }

  
  getGasolineras() {
    return this.http.get(
      'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
    );
  }
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
  getComunidadesAutonomas(): Observable<any> {
    return this.http.get(this.comunidadesUrl);
  }

  getProvinciasByComunidad(idCCAA: string): Observable<any[]> {
    const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProvinciasPorComunidad/${idCCAA}`;
    return this.http.get<any[]>(url);  
  }

}
