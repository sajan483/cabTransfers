import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'lib-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  animations: [
    trigger('ContentAnimation', [
      state(
        'hidden',
        style({
          overflow: 'hidden',
          right: '-100%',
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          right: '0',
          opacity: 1,
        })
      ),
      transition('hidden <=> visible', animate('0.3s')),
    ]),
    trigger('OverlayAnimation', [
      state(
        'hidden',
        style({
          opacity: 0,
          'pointer-events': 'none',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('hidden <=> visible', animate('0.3s')),
    ]),
    trigger('modalOverlay', [
      state(
        'hidden',
        style({
          opacity: 0,
          'pointer-events': 'none',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('hidden <=> visible', animate('0.3s')),
    ]),
    trigger('modalAnimation', [
      state(
        'hidden',
        style({
          transform: 'translate(-50%,-50%) scale(0)',
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          transform: 'translate(-50%,-50%) scale(1)',
          opacity: 1,
        })
      ),
      transition('hidden <=> visible', animate('0.3s')),
    ]),
    trigger('expand', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0,
          overflow: 'hidden',
        }),
        animate(
          '0.3s',
          style({
            height: '*',
            opacity: 1,
            overflow: 'hidden',
          })
        ),
      ]),
      transition(
        ':leave',
        animate(
          '0.3s',
          style({
            height: 0,
            opacity: 0,
            overflow: 'hidden',
          })
        )
      ),
    ]),
    trigger('balanceDiv', [
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate(250, style({ height: 0, opacity: 0 })),
      ]),
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate(250, style({ height: '*', opacity: 1 })),
      ]),
    ]),
  ],
})
export class LeftMenuComponent implements OnInit {
  @Input() closeFunction: Function = new Function();
  @Input() currentState: string = '';

  menuExpand: ExpandCollapse = {
    balance: false,
    myacc: false,
    mybook: false,
    acc: false,
    rech: false,
    sales: false,
    myprof: false,
    supp: false,
    rech2: false,
    mybook2: false,
    acc2: false,
    sales2: false,
    myprof2: false,
    supp2: false,
  };

  constructor() {}

  ngOnInit(): void {}

  closeMenu() {
    this.closeFunction();
  }

  expandMenu(menu: string) {
    this.menuExpand[menu] = !this.menuExpand[menu];
  }
}

interface ExpandCollapse {
  [key: string]: boolean;
}
