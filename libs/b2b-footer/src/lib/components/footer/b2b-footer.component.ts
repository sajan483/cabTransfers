import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-b2b-footer',
  templateUrl: 'b2b-footer.component.html',
  styleUrls: ['b2b-footer.component.scss'],
})
export class B2bFooterComponent implements OnInit {
  @Input() redirectUrl:string
  constructor() {}

  ngOnInit(): void {}
}
