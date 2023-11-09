import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'lib-b2b-header',
  templateUrl: 'b2b-header.component.html',
  styleUrls: ['b2b-header.component.scss'],
})
export class B2bHeaderComponent implements OnInit {
  @Input() redirectUrl:string
  menuState = 'hidden';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  showMenu() {
    this.menuState = 'visible';
    this.renderer.addClass(document.body, 'b2b-header-open');
  }

  hideMenu() {
    this.menuState = 'hidden';
    this.renderer.removeClass(document.body, 'b2b-header-open');
  }

  get hideMenuFunction() {
    return this.hideMenu.bind(this);
  }
}
