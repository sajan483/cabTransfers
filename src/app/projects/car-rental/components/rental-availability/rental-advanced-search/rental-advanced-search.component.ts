import { Component } from '@angular/core';

@Component({
  selector: 'app-rental-advanced-search',
  templateUrl: './rental-advanced-search.component.html',
  styleUrls: ['./rental-advanced-search.component.scss']
})
export class RentalAdvancedSearchComponent {
  showDateTimeCalendar: boolean = false;
  calendarToShow: number = -1;

  showSector: boolean = false;
  sectorToShow: number = -1;
  
  showCountries: boolean = false;

  openDateTimeCalendar(calendarId) {
    this.showDateTimeCalendar = true;
    this.calendarToShow = calendarId;
  }

  closeDateTimeCalendar(event) {
    console.log(event);
    
    this.showDateTimeCalendar = false;
    this.calendarToShow = -1;
  }

  
  openSector(sectorId) {
    this.showSector = true;
    this.sectorToShow = sectorId;
  }

  closeSector(event) {
    console.log(event);
    
    this.showSector = false;
    this.sectorToShow = -1;
  }

  openCountries() {
    this.showCountries = true;
  }

  closeCountries(event) {
    console.log(event);
    
    this.showCountries = false;
  }
}
