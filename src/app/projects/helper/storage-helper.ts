import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageHelper {

   saveFormGroupToStorage(key: string, value: any): any {
    if (typeof(sessionStorage) !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
   }

   getFormGroupFromStorage(key: string): any {
    const storedValue = JSON.parse (sessionStorage.getItem(key));
    if (storedValue != "") {
      return storedValue
    }
  }
}