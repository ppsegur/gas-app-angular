import { Pipe, PipeTransform } from '@angular/core';
import { Gasolinera } from '../interfaces/gasolinera.interface';

@Pipe({
  name: 'googleMapsPipe'
})
export class GoogleMapsPipePipe implements PipeTransform {

  transform(gasolinera: Gasolinera, ...args: unknown[]): unknown {
    const sanitizedLatitude = this.sanitizeValue(gasolinera.latitud);
    const sanitizedAltitude = this.sanitizeValue(gasolinera.longitud);
    return `https://maps.google.com/?q=${sanitizedLatitude},${sanitizedAltitude}`;
  }

  sanitizeValue(value: string): string {
    return value.replace(',', '.');

  }
}
