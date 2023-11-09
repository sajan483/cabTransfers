import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { of, scan, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() GetpricingResponse: any;
  @Input() Action: string;
  @Output() SessionTimeout = new EventEmitter();
  @ViewChild("timerDiv", { static: true }) menuElement: ElementRef;
  

  value: number = 100;
  timer$= of<number>();
  time: number = 1 * 60 + 59;
  theme: string = '';

  sticky: boolean = false;
  elementPosition: any;

  constructor() { }

  ngOnInit() {
      this.setTimerView();
  }

  setTimerView() {
    let dec = 100 / this.time;
    this.timer$ = timer(0, 1000).pipe(
      scan((acc) => {
        this.value -= dec;
        this.theme =
          this.value > 66.6 ? "green" : this.value > 33.3 ? "" : "red";
        if(this.sticky) this.theme+=' sticky'; else this.theme+='';
        return --acc;
      }, this.time),
      takeWhile((x) => x >= 0)
    );
  }

  ngOnDestroy() { }

}
