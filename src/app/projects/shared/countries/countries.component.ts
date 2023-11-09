import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Renderer2, ElementRef, HostListener } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchAPiService } from '../../services/search/search-api.service';
import { Subject, takeUntil } from 'rxjs';
import { GeneralHelper } from '../../helper/general-helper';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FilterPipe],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent {
  @Output() close = new EventEmitter();
  fullScreen: boolean = false;
  viewInitialized: boolean = false;
  countries: any;
  searchText;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private generalHelper = new GeneralHelper();

  constructor(private renderer: Renderer2, private eRef: ElementRef, public searchservice: SearchAPiService) { }

  ngOnInit() {
    this.countryList();
    this.checkWindowSize();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.viewInitialized = true;
    }, 500);
  }

  checkWindowSize() {
    if (window.innerWidth < 500) {
      this.fullScreen = true;
      this.renderer.addClass(document.body, 'scroll-hidden');
    } else {
      this.fullScreen = false;
    }
  }

  onSelectItem(country) {
    this.close.emit({event : true, country: country});
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.viewInitialized) {
      if(!this.eRef.nativeElement.contains(event.target)) {
        this.close.emit({event : true, country: ''});
      }
    }
  }

  // Country list getting from API
  countryList() {
    const countryList = this.generalHelper.getFromlocalStore('country');
    if (countryList != undefined && countryList != null && countryList != '') {
      this.countries = countryList;
    } else {
      this.searchservice.getTransferGetCountries()
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe({
          next: (res) => {
            if (res && res.response && Array.isArray(res.response) && res.response.length > 0) {
              this.countries = res.response[0];
              this.generalHelper.keepInSession('country', res.response[0], true)
            }
          },
          error: () => { }
        })
    }
  }

  countrySearch(event) {
    this.searchText = event.target.value;
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'scroll-hidden');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
