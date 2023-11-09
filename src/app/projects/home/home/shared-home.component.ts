import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { B2bFooterModule } from 'b2b-footer';
import { DateTimeCalendarModule } from 'date-time-calendar';
import { SectorsComponent } from '../../shared/sectors/sectors.component';
import { CountriesComponent } from '../../shared/countries/countries.component';
import { DriversAgeComponent } from '../../shared/drivers-age/drivers-age.component';
import { TravellersComponent } from '../../shared/travellers/travellers.component';
import { environment } from 'src/app/environments/environment';
import moment from 'moment';
import { SearchRequrest } from '../../model/searchRequest/searchRequest';
import { SearchHelper } from '../../helper/search-helper';
import { SearchStateService } from '../../services/search/search-state-service';
import { GeneralApiService } from '../../services/general/general-api-service';
import { GeneralStateService } from '../../services/general/general-state-service';
import { GeneralHelper } from '../../helper/general-helper';
import { GeneralAdapter } from '../../adapter/general-adapter';
import { GetAgentProfileRequest } from '../../model/agentProfile/agentProfileRequest';
import { Router } from '@angular/router';
import { SearchAPiService } from '../../services/search/search-api.service';
import { recentGetRequest, recentSaveRequest } from '../../model/recentSearch/recent-search-request';
import { SearchAdapter } from '../../adapter/search-adapter';

@Component({
  selector: 'app-shared-home',
  templateUrl: './shared-home.component.html',
  styleUrls: ['./shared-home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    B2bFooterModule,
    DateTimeCalendarModule,
    SectorsComponent,
    CountriesComponent,
    DriversAgeComponent,
    TravellersComponent,
  ],
})
export class SharedHomeComponent {
  @Input() type = '';

  redirectUrl = environment.RedirectionURL
  showDateTimeCalendar: boolean = false;
  calendarToShow: number = -1;
  
  showSector: boolean = false;
  sectorToShow: number = -1;

  showCountries: boolean = false;
  showAge: boolean = false;

  showTravellers: boolean = false;
  isB2b = environment.isB2b

  carSwitch: string = 'Transfers';

  private generalHelper = new GeneralHelper();
  private GeneralAdapter = new GeneralAdapter(this.generalState, this.generalHelper);
  public searchAdapter = new SearchAdapter();
  recentSearch: any = [];
    
  constructor(public generalService: GeneralApiService, public generalState: GeneralStateService, public searchHelper:SearchHelper, public stateSearch: SearchStateService, public router: Router, public searchService: SearchAPiService){}
  
  ngOnInit(){
    const searchRequestState = this.generalHelper.getFromlocalStore("SearchRequest")
    // if(searchRequestState != undefined && searchRequestState != null){
    //   const from_date = new Date(searchRequestState.ArrDate);
    //   const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
    //   if(!moment(from_date, "YYYY-MM-DD", true).isAfter(yesterday)){
    //     searchRequestState.ArrDate = moment().format();
    //     if(searchRequestState.tripType === 'Round'){
    //       searchRequestState.RetDate = moment().add(1, "day").format();
    //     }
    //   }
    //   this.createFormGroup(searchRequestState)
    // } else {
      const searchRequest = new SearchRequrest;
      this.createFormGroup(searchRequest);
    // }
    this.signature();
  }
  openDateTimeCalendar(calendarId) {
    this.showDateTimeCalendar = true;
    this.calendarToShow = calendarId;
  }

  closeDateTimeCalendar(event: any, calendartype: string) {
    if(event && event.startDate){
      let startDate = moment(event.startDate).format();
      if(calendartype === 'StartDate'){
        this.SearchRequest.get('ArrDate').setValue(startDate);
        this.timeFormater(event.time, 'ArrDate', 'ArrTime')
        if(this.SearchRequest.get('RetDate').value != ''){
          let departure = moment(this.SearchRequest.get('ArrDate').value);
          let returndate = moment(this.SearchRequest.get('RetDate').value);
          if(!departure.isBefore(returndate)){
            this.SearchRequest.get('RetDate').setValue(departure.add(1, 'days'));
          }
        }
      } else {
        this.SearchRequest.get('RetDate').setValue(startDate);
        let departure = moment(this.SearchRequest.get('ArrDate').value);
        this.timeFormater(event.time, 'RetDate', 'RetTime')
        let returndate = moment(this.SearchRequest.get('RetDate').value);
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

  private createFormGroup(searchRequest) {
    try {
      this.searchHelper.createsearchformgroup(searchRequest);
    } catch{

    }
  }

  public get SearchRequest(){
    return this.stateSearch.searchRequest
  }

  get totalTravellers(){
    return this.SearchRequest.get('adult').value + this.SearchRequest.get('child').value
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
      this.SearchRequest.get('pickUp').setValue("");
      this.SearchRequest.get('dropOff').setValue("");
      this.openSector(0)
    }
    this.showCountries = false;
  }
  
  openAge() {
    this.showAge = true;
  }

  closeAge(event) {
    console.log(event);
    
    this.showAge = false;
  }
  
  openTravellers() {
    this.showTravellers = true;
  }

  closeTravellers(event) {
    console.log(event);
      
    this.showTravellers = false;
  }


  public signature() {
    const Siganturerequest = this.GeneralAdapter.CreateSigantureRequest()
    this.generalService.getSignature(Siganturerequest).subscribe({
      next: (res) =>{
        if (res != undefined) {
          this.generalState.TUI = res.TUI;
          this.generalState.Token = res.Token;
          localStorage.setItem('TOKEN',JSON.stringify(this.generalState.Token));
          localStorage.setItem('TUI',JSON.stringify(this.generalState.TUI));
          this.agentProfile();
        }
      }, error: () => { }
    })
  }

  agentProfile() {
    let agentProfileRequest = {} as GetAgentProfileRequest;
    agentProfileRequest = this.GeneralAdapter.createGetAgentProfileRequest();
    this.generalService.getAgentProfile(agentProfileRequest).subscribe({
      next: (data) => {
        this.generalHelper.keepInSession('AGENTRESPONSE', data);
        this.getrecentSearch();
 
      }, error: () => { }
    });
  }

  getrecentSearch() {
    let recentSearchRequest = {} as recentGetRequest;
    recentSearchRequest = this.searchAdapter.createGetRecentRequest()    
    this.searchService.getRecentSearch(recentSearchRequest).subscribe({
      next: (data) => {
        if(data.code == "200"){
          data.searchList.forEach(element => {
            this.recentSearch.push(JSON.parse(element))    
          });
        this.searchHelper.updatesearchformgroup(this.recentSearch[0])
        } else {
          this.recentSearch = [];
        }
      }, error: () => { }
    });
  }

  updateSearch(value){
    this.searchHelper.updatesearchformgroup(value)
  }
 
  searchCar(){
    if(this.SearchRequest.valid){
      if(this.SearchRequest.get('pickUp').value != this.SearchRequest.get('dropOff').value){
        this.generalHelper.keepInSession("SearchRequest", this.SearchRequest.value, true)
        let recentSearchSaveRequest = {} as recentSaveRequest;
        recentSearchSaveRequest = this.searchAdapter.createSaveRecentRequest(this.SearchRequest.value, "I")
        this.searchService.setRecentSearch(recentSearchSaveRequest).subscribe();
        this.router.navigate(['/transfers/availability'])
      } else {
        this.SearchRequest.get('dropOff').setErrors({ compareValidator: true })
      }
    }
  }

  recentClear(values){
    let recentSearchSaveRequest = {} as recentSaveRequest;
    recentSearchSaveRequest = this.searchAdapter.createSaveRecentRequest(values, "D")
    this.searchService.setRecentSearch(recentSearchSaveRequest).subscribe();
  }
}


/** Cling appearece for flag routed to SSR test */