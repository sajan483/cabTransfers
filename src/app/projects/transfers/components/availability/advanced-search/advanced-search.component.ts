import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateTimeCalendarModule } from 'date-time-calendar';
import moment from 'moment';
import { SearchAdapter } from 'src/app/projects/adapter/search-adapter';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';
import { SearchHelper } from 'src/app/projects/helper/search-helper';
import { recentSaveRequest } from 'src/app/projects/model/recentSearch/recent-search-request';
import { SearchRequrest } from 'src/app/projects/model/searchRequest/searchRequest';
import { SearchAPiService } from 'src/app/projects/services/search/search-api.service';
import { SearchStateService } from 'src/app/projects/services/search/search-state-service';
import { CountriesComponent } from 'src/app/projects/shared/countries/countries.component';
import { SectorsComponent } from 'src/app/projects/shared/sectors/sectors.component';
import { TravellersComponent } from 'src/app/projects/shared/travellers/travellers.component';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DateTimeCalendarModule,
    TravellersComponent,
    SectorsComponent,
    CountriesComponent
  ]
})
export class AdvancedSearchComponent {
  showDateTimeCalendar: boolean = false;
  calendarToShow: number = -1;
  
  showSector: boolean = false;
  sectorToShow: number = -1;
  
  showCountries: boolean = false;
  showTravellers: boolean = false;

  private generalHelper = new GeneralHelper();
  public searchAdapter = new SearchAdapter();

  constructor(public stateSearch: SearchStateService, public searchHelper:SearchHelper, public searchService: SearchAPiService){}

  ngOnInit(){
    const searchRequestState = this.generalHelper.getFromlocalStore("SearchRequest")
    if(searchRequestState != undefined && searchRequestState != null){
      const from_date = new Date(searchRequestState.ArrDate);
      const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
      if(!moment(from_date, "YYYY-MM-DD", true).isAfter(yesterday)){
        searchRequestState.ArrDate = moment().format();
        if(searchRequestState.tripType === 'Round'){
          searchRequestState.RetDate = moment().add(1, "day").format();
        }
      }
      
      this.createFormGroup(searchRequestState)
    } else {
      const searchRequest = new SearchRequrest;
      this.createFormGroup(searchRequest);
    }
  }
  
  openDateTimeCalendar(calendarId) {
    this.showDateTimeCalendar = true;
    this.calendarToShow = calendarId;
  }

  closeDateTimeCalendar(event, calendartype: string) {
    
    if(event && event.startDate){
      event.startDate = moment(event.startDate).format();
      if(calendartype === 'StartDate'){
        this.SearchRequest.get('ArrDate').setValue(event.startDate);
        this.timeFormater(event.time, 'ArrDate', 'ArrTime')
        if(this.SearchRequest.get('RetDate').value != ''){
          let departure = moment(this.SearchRequest.get('ArrDate').value);
          let returndate = moment(this.SearchRequest.get('RetDate').value);
          if(!departure.isBefore(returndate)){
            this.SearchRequest.get('RetDate').setValue(departure.add(1, 'days'));
          }
        }
      } else {
        this.SearchRequest.get('RetDate').setValue(event.startDate);
        let departure = moment(this.SearchRequest.get('ArrDate').value);
        let returndate = moment(this.SearchRequest.get('RetDate').value);
        this.timeFormater(event.time, 'RetDate', 'RetTime')
        if(!departure.isBefore(returndate)){
          this.SearchRequest.get('RetDate').setValue(departure.add(1, 'days'));
        }
      }    
    }    
    this.showDateTimeCalendar = false;
    this.calendarToShow = -1;
  }

  timeFormater(eventTime, getFrom: string, setTo: string){
    // time
    const from_date = new Date(this.SearchRequest.get(getFrom).value);
    const currentTime = moment();
    const today = moment().format("YYYY-MM-DD");
    if(eventTime != null){ 
      const from_time = moment(eventTime.time24, 'h:mma');
      if(!moment(from_date, "YYYY-MM-DD", true).isAfter(today) && !moment(from_time).isAfter(currentTime)){
        // current Time
        this.SearchRequest.get(setTo).setValue(currentTime.format('HH:mm'));
      } else {
        // Futcher Time
        this.SearchRequest.get(setTo).setValue(eventTime.time24);
      }
    } else {
      // current Time
      this.SearchRequest.get(setTo).setValue(currentTime.format('HH:mm'));
    }
  }

  clearReturnDate(event){
    event.stopPropagation();
    this.SearchRequest.get('RetDate').setValue('');
    this.SearchRequest.get('RetTime').setValue('');
  }
  
  openSector(sectorId) {
    this.showSector = true;
    this.sectorToShow = sectorId;
  }

  closeSector(event, type) {
    if(type === 'pick-up' && event.city != ''){
      this.SearchRequest.get('tripType').setValue('Oneway')
      this.SearchRequest.get('pickUp').setValue(event.city.locationName);
    } else if(type === 'drop' && event.city != ''){
      this.SearchRequest.get('tripType').setValue('Round')
      this.SearchRequest.get('dropOff').setValue(event.city.locationName);
    }
    this.showSector = false;
    this.sectorToShow = -1;
  }

  openCountries() {
    this.showCountries = true;
  }

  closeCountries(event) {
    if(event.country != ''){
      this.SearchRequest.get('country').setValue(event.country.name);
      this.SearchRequest.get('country_code').setValue(event.country.code);
      this.openSector(0)
    }    
    this.showCountries = false;
  }

  openTravellers() {
    this.showTravellers = true;
  }

  closeTravellers(event) {
    console.log(event);
    
    this.showTravellers = false;
  }

  public get SearchRequest(){
    return this.stateSearch.searchRequest
  }

  get totalTravellers(){
    return this.SearchRequest ? this.SearchRequest.get('adult').value + this.SearchRequest.get('child').value : null;
  }

  private createFormGroup(searchRequest) {
    try {
      this.searchHelper.createsearchformgroup(searchRequest);
    } catch{

    }
  }

  searchCar(){
    if(this.SearchRequest.valid){
      if(this.SearchRequest.get('pickUp').value != this.SearchRequest.get('dropOff').value){
        this.generalHelper.keepInSession("SearchRequest", this.SearchRequest.value, true)
        let recentSearchSaveRequest = {} as recentSaveRequest;
        recentSearchSaveRequest = this.searchAdapter.createSaveRecentRequest(this.SearchRequest.value, "I")
        this.searchService.setRecentSearch(recentSearchSaveRequest).subscribe();
      } else {
        this.SearchRequest.get('dropOff').setErrors({ compareValidator: true })
      }
    }  
  }
}
