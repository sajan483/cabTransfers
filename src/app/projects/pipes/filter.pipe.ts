import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter',
        standalone:true
    })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, type: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    if(searchText.length <= 2){
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return type === 'city' ? it.locationName.toLocaleLowerCase().includes(searchText): it.name.toLocaleLowerCase().includes(searchText);
    });
  }
}