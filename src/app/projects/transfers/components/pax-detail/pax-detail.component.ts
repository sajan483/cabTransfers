import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransfersDetailComponent } from './transfers-detail/transfers-detail.component';
import { PassengerInfoComponent } from './passenger-info/passenger-info.component';
import { ContactDetailComponent } from '../../shared/contact-detail/contact-detail.component';
import { ShareConfirmComponent } from './share-confirm/share-confirm.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { SidepanelComponent } from 'src/app/projects/shared/sidepanel/sidepanel.component';
import { ReconfirmationComponent } from './payment-options/reconfirmation/reconfirmation.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FareDetailsComponent } from './fare-details/fare-details.component';
import { PricingStateService } from 'src/app/projects/services/pricing/pricing-state-service';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';
import { GeneralStateService } from 'src/app/projects/services/general/general-state-service';
import { paxAPIService } from 'src/app/projects/services/paxdetails/pax-details-api.service';
import { Subject, takeUntil } from 'rxjs';
import { PaxDetailsStateService } from 'src/app/projects/services/paxdetails/pax-details-state.service';

@Component({
    selector: 'app-pax-detail',
    templateUrl: './pax-detail.component.html',
    styleUrls: ['./pax-detail.component.scss'],
    standalone: true,
  imports: [
    MatDialogModule,
    TransfersDetailComponent,
    PassengerInfoComponent,
    ContactDetailComponent,
    ShareConfirmComponent,
    PaymentOptionsComponent,
    ContactDetailsComponent,
    SidepanelComponent,
    ReconfirmationComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FareDetailsComponent
  ],
})
export class PaxDetailComponent {
  showSidePanel: boolean = false;
  showSidePanel1: boolean = false;
  netFareHide = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  pricingResponse: any;

  openSidePanel() {
    this.showSidePanel = !this.showSidePanel;
  }
  openCancellation() {
    this.showSidePanel1 = !this.showSidePanel1;
  }
  constructor(public dialog: MatDialog, public paxapiService: paxAPIService, public generalHelper: GeneralHelper, public generalState: GeneralStateService, public paxStateService: PaxDetailsStateService) { }

  ngOnInit(){
    this.availablityDetails();
  }

  availablityDetails(){
    let agentCode = JSON.parse(sessionStorage.getItem('AGENTRESPONSE')).code;
    const tui = this.generalState.TUI != "" ? this.generalState.TUI : this.generalHelper.getFromlocalStore('TUI')
    const request = {"Request":{ TUI:'', AgentId: ''},ConversationID:"b2cd8a57294f4cb597781e64916cdbe7",
    TotalRate:"200"};
    this.paxapiService.getTransferPricing(request).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res =>{
      if (res && res.response && Array.isArray(res.response) && res.response.length > 0 && res.response[0] != null) {
        this.paxStateService.pricingResponse(res.response);
      }
    });
  }

  netFareVisible(visble){
    this.netFareHide = !visble;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
