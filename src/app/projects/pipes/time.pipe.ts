import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ 
    name: 'timeconverter',
    standalone:true
})
export class TimeConvert implements PipeTransform {
  transform(items: any[]) {
    return moment(items.toString(), 'LT').format('HH:mm')
  }
}