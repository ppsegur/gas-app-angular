import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Municipio, MunicipioResponse } from '../../interfaces/municipio.interface';
import { MunicipioService } from '../../services/municipio.service';
import { GasolineraService } from '../../services/gasolinera.service';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete.component.html',
  styleUrl: 'autocomplete.component.css',
  //standalone: true,
  /*imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],*/
})
export class AutocompleteFilterExample implements OnInit {

  constructor(private municipioService: MunicipioService,
    private gasolineraService: GasolineraService) { }

  listadoMunicipios: Municipio[] = [];
  myControl = new FormControl('');
  options: Municipio[] = this.listadoMunicipios;
  filteredOptions: Observable<Municipio[]> = new Observable<Municipio[]>();

  ngOnInit() {
    this.filtrarGasolinerasPorProvincia();

    this.filteredOptions = of(this.listadoMunicipios);
    this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): Municipio[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.municipio_nombre.toLowerCase().includes(filterValue));
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
