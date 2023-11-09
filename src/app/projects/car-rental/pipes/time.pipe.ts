import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return `${('0' + Math.floor(value / 60)).slice(-2)}:${('0' + (value % 60)).slice(-2)}`;
  }


}
