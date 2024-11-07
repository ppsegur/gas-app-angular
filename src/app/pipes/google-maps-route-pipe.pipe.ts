import { Pipe, PipeTransform } from '@angular/core';
import { Gasolinera } from '../interfaces/gasolinera.interface';

@Pipe({
  name: 'googleMapsRoutePipe'
})
export class GoogleMapsRoutePipePipe implements PipeTransform {
  
  transform(gasolinera: Gasolinera, ...args: unknown[]): unknown {
    return `https://www.google.com/maps/dir/?api=1&destination=${this.sanitizeValue(gasolinera.latitud)},${this.sanitizeValue(gasolinera.longitud)}`;
  }

  sanitizeValue(value: string): string {
    return value.replace(',', '.');

  }

}
