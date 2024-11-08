import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MunicipioResponse } from '../interfaces/municipio.interface';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { }

  filterGasListByProvincia() {
    return this.http.get<MunicipioResponse>('http://localhost:3000/gas-poblation-list');
  }
}
