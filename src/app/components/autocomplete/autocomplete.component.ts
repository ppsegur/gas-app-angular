import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Municipio, MunicipioResponse } from '../../interfaces/municipio.interface';
import { MunicipioService } from '../../services/municipio.service';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrl: 'autocomplete.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class AutocompleteFilterExample implements OnInit {

  constructor(private municipioService: MunicipioService) { }

  myControl = new FormControl('');
  options: Municipio[] = [];
  filteredOptions!: Observable<MunicipioResponse>;

  ngOnInit() {
    this.filteredOptions = this.filtrarGasolinerasPorProvincia();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => ({ results: this._filter(value || '') })),
    );
  }

  private _filter(value: string): Municipio[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.municipio_nombre.toLowerCase().includes(filterValue));
  }

  filtrarGasolinerasPorProvincia(): Observable<MunicipioResponse> {
    return this.municipioService.filterGasListByProvincia().pipe(
      map((respuesta) => {
        this.options = respuesta.results;
        return respuesta;
      })
    );
  }
}
