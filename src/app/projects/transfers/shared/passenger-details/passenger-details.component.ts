import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';

@Component({
  selector: 'app-passenger-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent {

  private generalHelper = new GeneralHelper();
  public Display: any;
  Adult = [];
  Child= [];

  constructor() {}

  ngOnInit() {
    this.Display = this.generalHelper.getFromSessionStore("PassengerDetails")
    this.Adult = this.Display.PaxItinerary;
    this.Child = this.Display.ChildItinerary;  
  }
}
