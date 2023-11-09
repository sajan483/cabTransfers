import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeneralHelper {
  constructor(){}

  getFromlocalStore = (key: string): any => {
    if (typeof (localStorage) !== "undefined") {
      let item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    }
  }

  getFromSessionStore = (key: string): any => {
    if (typeof (sessionStorage) !== "undefined") {
      let item = sessionStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    }
  }

  keepInSession = (key: string, val: any, persist?: any): any => {
    if (persist) {
      if (typeof (localStorage) !== "undefined") {
        localStorage.setItem(key, JSON.stringify(val));
      }
    }
    else {
      if (typeof (sessionStorage) !== "undefined") {
        sessionStorage.setItem(key, JSON.stringify(val));
      }
    }
  }

  markFormControlTouched(formGroup: FormGroup) {
    if (formGroup) {
      Object.keys(formGroup.controls)
        .map((x) => formGroup.controls[x])
        .forEach((control: any) => {
          if (control.controls) {
            this.markFormControlTouched(control);
          } else {
            control.markAsTouched();
          }
        });
    }
  }
}