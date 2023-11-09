import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Renderer2, ElementRef, HostListener, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchAPiService } from '../../services/search/search-api.service';
import { Subject, takeUntil } from 'rxjs';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FilterPipe]
})
export class SectorsComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() countryname: any;
  @Input() countrycode: any;
  @Input() dropdowntype: string;

  fullScreen: boolean = false;
  viewInitialized: boolean = false;
  cityList: any;
  recentSearch: boolean = false;
  
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  searchText: any;

  constructor(private renderer: Renderer2, private eRef: ElementRef, public searchservice: SearchAPiService) { }

  ngOnInit() { 
    this.getcityList();
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

  onSelectItem(city) {
    this.close.emit({event:true, city: city});
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.viewInitialized) {
      if(!this.eRef.nativeElement.contains(event.target)) {
        this.close.emit({event:true, city: ''});
      }
    }
  }

  getcityList(){
      const agentCode = JSON.parse(sessionStorage.getItem('AGENTRESPONSE')).code;
      let request = {Country: this.countryname, AgentCode: agentCode}
      this.searchservice.getTransferLocations(request).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (res) => {
          if (res && res.response && Array.isArray(res.response) && res.response.length > 0) {
            this.cityList = res.response[0];
          }
        }
      })
  }

  citySearch(event){
    this.searchText = event.target.value;
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'scroll-hidden');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
