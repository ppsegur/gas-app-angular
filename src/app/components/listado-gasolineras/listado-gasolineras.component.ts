import { Component, OnInit } from '@angular/core';
import { Gasolinera, ListaEessprecio } from '../../interfaces/gasolinera.interface';
import { GasolineraService } from '../../services/gasolinera.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-listado-gasolineras',
  templateUrl: './listado-gasolineras.component.html',
  styleUrl: './listado-gasolineras.component.css'
})
export class ListadoGasolinerasComponent implements OnInit {

  
  listadoGasolineras: Gasolinera[] = [];
  originalListadoGasolineras: Gasolinera[] = [];
  tipoCombustible: string = 'gasolina';
  precioMin: number = 0;
  precioMax: number = 2;
  postalCode: string = '';
  rotulos: string[] = [];
  noResults: boolean = false;
  postalCodeControl = new FormControl('');
  filteredPostalCodes: Observable<string[]> | undefined;
  filteredGasolineras: Gasolinera[] = [];
  fuelType: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;
  comunidadesAutonomas: any[] = [];
  provincias: any[] = [];
  selectedComunidad: string = '';
  selectedProvincia: string = '';
  comunidadMap: { [key: string]: string } = {};

  constructor(private gasService: GasolineraService) { }
  ngOnInit() {
    this.gasService.getGasolineras().subscribe((respuesta) => {
      console.log('Respuesta completa de la API:', respuesta);
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];

        console.log('Array de gasolineras procesado:', arrayGasolineras);

        this.listadoGasolineras = this.cleanProperties(arrayGasolineras);
        this.filteredGasolineras = this.listadoGasolineras;

        this.filteredPostalCodes = this.postalCodeControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterPostalCodes(value ?? ''))
        );

        console.log('Gasolineras después de limpiar propiedades:', this.listadoGasolineras);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  private _filterPostalCodes(value: string = ''): string[] {
    const filterValue = value.toLowerCase();
    return this.originalListadoGasolineras
      .map(g => g.postalCode)
      .filter(option => option.toLowerCase().includes(filterValue));
  }
  
  
  onComunidadChange() {
    if (this.selectedComunidad) {
      this.gasService.getProvinciasByComunidad(this.selectedComunidad).subscribe((data: any[]) => {
        console.log('Provincias para la comunidad seleccionada:', data);
        
        if (data && data.length) {
          this.provincias = data.map((provincia) => ({
            IDPovincia: provincia.IDPovincia,
            nombre: provincia.Provincia
          }));
        } else {
          this.provincias = [];
        }
      });
    } else {
      this.provincias = [];
    }
  }

  private loadGasList() {
    this.gasService.getGasList().subscribe((results) => {
      const respuestaEnString = JSON.stringify(results);
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
    return arrayGasolineras
    .filter((gasolineraChusquera: any) => {
      return gasolineraChusquera['IDEESS'] && gasolineraChusquera['Rótulo'];
    })
    .map((gasolineraChusquera: any) => {
      console.log('Datos de gasolinera:', gasolineraChusquera);
      const gasolinera = new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        parseFloat(gasolineraChusquera['Precio Gasolina 95 E5'].replace(',', '.')),
        parseFloat(gasolineraChusquera['Precio Gasoleo A'].replace(',', '.')),
        gasolineraChusquera['C.P.'],
        gasolineraChusquera['Dirección'],
        gasolineraChusquera['IDCCAA'],
        gasolineraChusquera['Provincia'],
        gasolineraChusquera['Municipio'], // Add the missing argument here
        gasolineraChusquera['comunidad']
      );

      console.log('Gasolinera creada con IDCCAA:', gasolinera);

      return gasolinera;
    });
  }

  filtrarGasolineras() {
    this.postalCode = this.postalCodeControl.value ?? '';
    this.listadoGasolineras = this.gasService.filterGasList(
      this.originalListadoGasolineras,
      this.tipoCombustible,
      this.precioMin,
      this.precioMax,
      this.postalCode,
      this.rotulos
    );
    this.noResults = this.listadoGasolineras.length === 0;
  }
  filterGasolineras() {
    this.filteredGasolineras = this.listadoGasolineras.filter(gasolinera => {
      const matchesFuelType = this.fuelType === '' ||
        (this.fuelType === 'Gasolina 95' && gasolinera.price95 > 0) ||
        (this.fuelType === 'Diesel' && gasolinera.priceDiesel > 0);

      const matchesPriceRange = gasolinera.price95 >= this.minPrice && gasolinera.price95 <= this.maxPrice;
      const matchesPostalCode = this.postalCodeControl.value === '' || gasolinera.postalCode === this.postalCodeControl.value;
      const matchesComunidad = this.selectedComunidad === '' || gasolinera.comunidad === this.selectedComunidad;
      const matchesProvincia = this.selectedProvincia === '' || gasolinera.provincia === this.selectedProvincia;

      console.log('Comunidad seleccionada (ID):', this.selectedComunidad);
      console.log('IDCCAA de gasolinera:', gasolinera.comunidad);

      return matchesFuelType && matchesPriceRange && matchesPostalCode && matchesComunidad && matchesProvincia;
    });

    if (this.filteredGasolineras.length === 0) {
      console.log('No hay resultados que coincidan con la búsqueda.');
    }
  }
 

  onRotuloChange(event: any) {
    const rotulo = event.target.value;
    if (event.target.checked) {
      this.rotulos.push(rotulo);
    } else {
      this.rotulos = this.rotulos.filter(r => r !== rotulo);
    }
  }

  mostrarFiltros: boolean = false;

  toggleFiltros() {
  
    this.mostrarFiltros = !this.mostrarFiltros;
  }
}