import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Renderer2, ElementRef, HostListener } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-drivers-age',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './drivers-age.component.html',
  styleUrls: ['./drivers-age.component.scss']
})
export class DriversAgeComponent {
  @Output() close = new EventEmitter();
  fullScreen: boolean = false;
  viewInitialized: boolean = false;
  startLimit = 20;
  endLimit = 80;
  ageArray = [];
  constructor(private renderer: Renderer2, private eRef: ElementRef) { }

  ngOnInit() { 
    this.ageArray = [...Array(1+(this.endLimit-this.startLimit)).keys()].map(i => this.startLimit+i);

    this.checkWindowSize();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.viewInitialized  = true;
    }, 500);
  }
  
  checkWindowSize() {
    if(window.innerWidth < 500) {
      this.fullScreen = true;
      this.renderer.addClass(document.body, 'scroll-hidden');
    } else {
      this.fullScreen = false;
    }
  }

  onSelectItem() {
    this.close.emit(true);
  }
  
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'scroll-hidden');
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.viewInitialized) {
      if(!this.eRef.nativeElement.contains(event.target)) {
        this.close.emit();
      }
    }
  }
}
