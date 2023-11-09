import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Renderer2, ElementRef, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SearchStateService } from '../../services/search/search-state-service';

@Component({
  selector: 'app-travellers',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.scss']
})
export class TravellersComponent {
  @Output() close = new EventEmitter();
  fullScreen: boolean = false;
  viewInitialized: boolean = false;

  constructor(private renderer: Renderer2, private eRef: ElementRef, public stateSearch: SearchStateService) { }

  ngOnInit() { 
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

  public get SearchRequest(){
    return this.stateSearch.searchRequest
  }
  setTravellerCount(travellerType: string, countChecker: boolean) {
    if (travellerType === "A") {
      const adltControl = this.SearchRequest.get('adult');
      if (countChecker && adltControl.value < 15) {
        adltControl.setValue(adltControl.value + 1);
      }
      else if (!countChecker && adltControl.value > 1) {
        adltControl.setValue(adltControl.value - 1);
      }
    }
    else if (travellerType === "C") {
      const chldControl = this.SearchRequest.get('child');
      if (countChecker && chldControl.value < 15) {
        chldControl.setValue(chldControl.value + 1);
      }
      else if (!countChecker && chldControl.value > 0) {
        chldControl.setValue(chldControl.value - 1);
      }
    }
  }
}
