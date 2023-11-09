import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.scss']
})
export class FooterLinksComponent implements OnInit {
  @Input() redirectUrl:string

  constructor() { }

  ngOnInit(): void {
  }

  navigataToMainPage(path:string) {
    window.open(`${this.redirectUrl}/${path}`, '_blank');
  }

}
