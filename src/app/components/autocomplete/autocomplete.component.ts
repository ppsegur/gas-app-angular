import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Municipio, MunicipioResponse } from '../../interfaces/municipio.interface';
import { MunicipioService } from '../../services/municipio.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css']
})
export class AutocompleteFilterExample implements OnInit {

  myControl = new FormControl('');
  options: Municipio[] = [];
  filteredOptions: Observable<Municipio[]> = of([]);

  constructor(private municipioService: MunicipioService) { }

  ngOnInit() {
    this.filtrarGasolinerasPorProvincia().subscribe(respuesta => {
      this.options = respuesta.results || [];
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    });
  }

  private _filter(value: string): Municipio[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.municipio_nombre.toLowerCase().includes(filterValue));
  }

  filtrarGasolinerasPorProvincia(): Observable<MunicipioResponse> {
    return this.municipioService.filterGasListByProvincia();
  }
}
