import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { animate, group, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PaymentModule } from './payment.module';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, FormsModule, PaymentModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  animations: [
    trigger('removeAnim', [
      transition(':leave', [
        style({ transform: 'translateY(0%)', opacity: 1 }),
        animate('.5s linear', style({ transform: 'translateY(-100%)', opacity: 1 }))
      ])
    ]),
    trigger("paymentAnim", [
      transition('void<=>other', [
        query(':enter', style({ top: '0', position: 'absolute', opacity: 0 }), { optional: true }),
        query(':leave', style({ top: '0', position: 'absolute', opacity: 1 }), { optional: true }),

        group([
          query(':leave', stagger('250ms', [
            animate('.50s linear', keyframes([
              style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
              style({ opacity: 1, transform: 'translateX(-100%)', offset: 1.0 }),
            ]))]), { optional: true }),
          query(':enter', stagger('250ms', [
            animate('.50s linear', keyframes([
              style({ opacity: 1, transform: 'translateX(100%)', offset: 0 }),
              style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
            ]))]), { optional: true }),
        ]),
      ]),
      transition('void<=>first', [
        group([
          query(':leave', stagger('250ms', [
            animate('.50s linear', keyframes([
              style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
              style({ opacity: 1, transform: 'translateX(-100%)', offset: 1.0 }),
            ]))]), { optional: true }),
          // query(':leave', stagger('250ms', [
          //   animate('.5s linear', keyframes([
          //     style({ opacity: 1, transform: 'translateY(0%)', offset: 0 }),
          //     style({ opacity: 1, transform: 'translateY(-100%)', offset: 1.0 }),
          //   ]))]), { optional: true }),
          query(':enter', stagger('250ms', [
            animate('.5s linear', keyframes([
              style({ opacity: 1, transform: 'translateY(-100%)', offset: 0 }),
              style({ opacity: 1, transform: 'translateY(0%)', offset: 1.0 }),
            ]))]), { optional: true }),
        ]),
      ]),
      transition('void<=>mob', [
        group([
          query(':enter', stagger('250ms', [
            animate('.5s linear', keyframes([
              style({ opacity: 1, height: 0, offset: 0 }),
              style({ opacity: 1, height: '*', offset: 1.0 }),
            ]))]), { optional: true }),
        ]),
      ]),
    ])
  ],

})
export class PaymentComponent {
  checked: number = 0;
  animState: string = 'first';
  isMob: boolean = false;
  removeWrapper: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platform: any) {}

  ngOnInit() { 
    this.checkWindowSize();
  }

  onChecked(checked, id) {
    this.changeAnimation();
    this.checked = checked ? id : 0;
    this.addWrapperClass();
  }

  changeAnimation() {
    if (this.checked == 0) {
      this.animState = 'first';
    } else {
      this.animState = 'other';
    }
  }

  onBoxClick(checked, id) {
    this.changeAnimation();
    this.checked = !checked ? id : 0;
    this.addWrapperClass();
  }
  
  onTabClick(id) {
    this.animState = 'mob';
    this.checked = this.checked != id ? id : 0;
  }

  checkWindowSize() {
    if (isPlatformBrowser(this.platform)) {
      if (window.innerWidth < 751) {
        this.animState = 'mob';
        this.isMob = true;
      } else {
        this.isMob = false;
        this.changeAnimation();
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.checkWindowSize();
  }

  addWrapperClass() {
    if (this.checked == 0) {
      setTimeout(() => {
        this.removeWrapper = false;
      }, 600);
    } else {
      this.removeWrapper = true;
    }
  }
}
