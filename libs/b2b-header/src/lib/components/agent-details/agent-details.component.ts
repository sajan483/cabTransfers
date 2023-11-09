import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss'],
})
export class AgentDetailsComponent implements OnInit {
  @Output() onMenuClick = new EventEmitter();
  @Input() redirectUrl:string

  showSkeleton: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  openSideMenu() {
    this.onMenuClick.emit();
  }

  navigataToMainPage(path) {
    console.log("path",path,this.redirectUrl)
    //window.location.href = `${this.redirectUrl}/${path}`;
   // window.open('https://agents.akbartravelsonline.com/b2bplus/login', '_blank');
  }
  
}
