import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from 'src/app/projects/shared/payment/payment.component';
import { SidepanelComponent } from 'src/app/projects/shared/sidepanel/sidepanel.component';
import { ReconfirmationComponent } from './reconfirmation/reconfirmation.component';
import { CommonModule } from '@angular/common';
import { PricingStateService } from 'src/app/projects/services/pricing/pricing-state-service';
import { FormArray } from '@angular/forms';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';
@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss'],
  standalone: true,
  imports: [
    PaymentComponent,
    SidepanelComponent,
    ReconfirmationComponent,
    CommonModule,
  ]
})

export class PaymentOptionsComponent {
  showSidePanel: boolean = false;
  showSidePanel1: boolean = false;
  Passenger: any;
  PassengerChild: any;
  ChildItineraryValidation = false;

  private generalHelper = new GeneralHelper();

  constructor(
    public dialog: MatDialog,
    private pricingState: PricingStateService
    ) { }


  openSidePanel() {
    this.ChildItineraryValidation = false;
    if (this.PaxItinerary.status == "INVALID") {
      this.generalHelper.markFormControlTouched(this.PaxItinerary);
      this.pricingState.setPaxValidationData(true);
    }

    if (this.ContactDetailsFormGroup.invalid) {
      this.generalHelper.markFormControlTouched(this.ContactDetailsFormGroup);
      this.pricingState.setContactInfoValidationData(true);
    }

    if (this.PaxItinerary.valid && this.ContactDetailsFormGroup.valid && this.ChildDetails == undefined) {
      this.showSidePanel = !this.showSidePanel;
      this.combineFormValues();
      this.generalHelper.keepInSession("PassengerDetails", this.Passenger);
    }

    if (this.ChildDetails != undefined) {
      for (let i = 0; i < this.ChildItinerary.controls.length; i++) {
        if (this.ChildItinerary.controls[i].get('FirstNameChild').value != "") {
          if (this.ChildItinerary.status == "INVALID") {
            this.generalHelper.markFormControlTouched(this.ChildItinerary);
            this.pricingState.setChildValidationData(true);
          }
        }
      }

      for (let i = 0; i < this.ChildItinerary.controls.length; i++) {
        if ((this.ChildItinerary.controls[i].get('FirstNameChild').value == "") || (this.ChildItinerary.controls[i].get('TitleChild').value == "") || (this.ChildItinerary.controls[i].get('LastNameChild').value == "")) {
          this.ChildItineraryValidation = true;
          this.generalHelper.markFormControlTouched(this.ChildItinerary);
          this.pricingState.setChildValidationData(true);
        }
      }
    }

    if (this.PaxItinerary.invalid || this.ContactDetailsFormGroup.invalid) {
      return;
    }

    if (this.PaxItinerary.valid && this.ContactDetailsFormGroup.valid && this.ChildItineraryValidation == false && this.ChildDetails != undefined) {
      for (let i = 0; i < this.ChildItinerary.controls.length; i++) {
        if (this.ChildItinerary.controls[i].get('FirstNameChild').value != "") {
          if (this.ChildItinerary.controls[i].status == "INVALID") {
            this.ChildItineraryValidation = true;
          }
        }
      }

      if (this.PaxItinerary.valid && this.ContactDetailsFormGroup.valid && this.ChildItineraryValidation == false) {
        this.showSidePanel = !this.showSidePanel;
        this.combineFormValues();
        this.generalHelper.keepInSession("PassengerDetails", this.PassengerChild);
      }
    }
  }

  public get PaxDetails(): any {
    if(this.pricingState && this.pricingState.PaxDetailsFormGroup) {
      return this.pricingState.PaxDetailsFormGroup;
    }
  }

  public get ChildDetails(): any {
    if ( this.pricingState.ChildDetailsFormGroup) {
      return this.pricingState.ChildDetailsFormGroup;
    }
  }
  
  public get PaxItinerary(): any {
    if (this.PaxDetails) {
      return this.PaxDetails.controls['Adult'] as FormArray;
    }
  }

  public get ChildItinerary(): any {
    if (this.ChildDetails) {
      return this.ChildDetails.controls['Child'] as FormArray;
    }  
  }

  public get ContactDetailsFormGroup() {
    return this.pricingState.ContactDetailsFormGroup;
  }

  combineFormValues() {
    if (this.PaxDetails && this.ChildDetails) {
      this.PassengerChild = {
        PaxItinerary: (this.PaxItinerary.value),
        ChildItinerary: (this.ChildItinerary.value),
        ContactInfo: (this.ContactDetailsFormGroup.value),
     };
    }

    if (this.PaxDetails) {
      this.Passenger = {
        PaxItinerary: (this.PaxItinerary.value),
        ContactInfo: (this.ContactDetailsFormGroup.value),
     };
    }
  }

  openCancellation() {
    this.showSidePanel1 = !this.showSidePanel1;
  }

}