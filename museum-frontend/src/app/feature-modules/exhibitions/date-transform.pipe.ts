import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transform(value: string): Date | null {
    if (!value) return null;
    
    const parts = value.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mesec je 0-indeksiran u JS
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }

}
