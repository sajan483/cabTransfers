import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CarRentalRoutingModule } from './car-rental-routing.module';

import { HomeComponent } from './components/home/home.component';
import { CompareComponent } from './components/compare/compare.component';
import { CompareListsComponent } from './components/compare/compare-lists/compare-lists.component';
import { ComparePopupComponent } from './components/compare-popup/compare-popup.component';
import { InclusionsPopupComponent } from './components/inclusions-popup/inclusions-popup.component';
import { RentalAvailabilityComponent } from './components/rental-availability/rental-availability.component';
import { RentalDisplayComponent } from './components/rental-availability/rental-display/rental-display.component';
import { FilterComponent } from './components/rental-availability/rental-display/filter/filter.component';
import { RentalAdvancedSearchComponent } from './components/rental-availability/rental-advanced-search/rental-advanced-search.component';
import { RentalPricingComponent } from './components/rental-pricing/rental-pricing.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { SelectCarComponent } from './components/select-car/select-car.component';
import { ReviewCarComponent } from './components/rental-pricing/review-car/review-car.component';
import { BookingDetailsComponent } from './components/rental-pricing/booking-details/booking-details.component';
import { ContactDetailsComponent } from './components/rental-pricing/contact-details/contact-details.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { UpgradeCarComponent } from './components/rental-pricing/upgrade-car/upgrade-car.component';
import { ExtrasComponent } from './components/rental-pricing/extras/extras.component';
import { FareDetailsComponent } from './components/rental-pricing/fare-details/fare-details.component';
import { PayableLocallyComponent } from './components/rental-pricing/payable-locally/payable-locally.component';
import { PaymentOptionsComponent } from './components/rental-pricing/payment-options/payment-options.component';
import { ReconfirmationComponent } from './components/rental-pricing/payment-options/reconfirmation/reconfirmation.component';
import { TimerComponent } from './components/timer/timer.component';

import { TimePipe } from './pipes/time.pipe';

import { FareDetailComponent } from './shared/fare-detail/fare-detail.component';
import { BookingDetailCardComponent } from './shared/booking-detail-card/booking-detail-card.component';
import { FareDetailsCardComponent } from './shared/fare-details-card/fare-details-card.component';
import { PayableLocallyCardComponent } from './shared/payable-locally-card/payable-locally-card.component';

import { PaymentComponent } from '../shared/payment/payment.component';
import { SectorsComponent } from '../shared/sectors/sectors.component';
import { PaymentMethodCommonComponent } from '../shared/payment-method-common/payment-method-common.component';
import { ContactDetailsCommonComponent } from '../shared/contact-details-common/contact-details-common.component';
import { CountriesComponent } from '../shared/countries/countries.component';
import { SidepanelComponent } from '../shared/sidepanel/sidepanel.component';

import { DateTimeCalendarModule } from 'date-time-calendar';
import { B2bFooterModule } from 'b2b-footer';
import { EmailPopupComponent } from './shared/email-popup/email-popup.component';
import { SharedHomeComponent } from '../home/home/shared-home.component';
import { SearchAPiService } from '../services/search/search-api.service';

@NgModule({
  declarations: [
    HomeComponent,
    CompareComponent,
    CompareListsComponent,
    ComparePopupComponent,
    InclusionsPopupComponent,
    RentalAvailabilityComponent,
    RentalDisplayComponent,
    FilterComponent,
    RentalAdvancedSearchComponent,
    RentalPricingComponent,
    TermsConditionsComponent,
    SelectCarComponent,
    ReviewCarComponent,
    BookingDetailsComponent,
    ContactDetailsComponent,
    ConfirmationComponent,
    UpgradeCarComponent,
    ExtrasComponent,
    FareDetailsComponent,
    PayableLocallyComponent,
    PaymentOptionsComponent,
    ReconfirmationComponent,
    TimerComponent,
    TimePipe,
    EmailPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatRadioModule,
    B2bFooterModule,
    CarRentalRoutingModule,
    SidepanelComponent,
    FareDetailComponent,
    BookingDetailCardComponent,
    FareDetailsCardComponent,
    SharedHomeComponent,
    BookingDetailCardComponent,
    DateTimeCalendarModule,
    PaymentComponent,
    SectorsComponent,
    PayableLocallyCardComponent,
    PaymentMethodCommonComponent,
    ContactDetailsCommonComponent,
    MatProgressSpinnerModule,
    CountriesComponent
  ],
  providers: [SearchAPiService],
  exports: [
    CompareComponent,
    CompareListsComponent,
    ComparePopupComponent,
    InclusionsPopupComponent,
    RentalAvailabilityComponent,
    RentalDisplayComponent,
    FilterComponent,
    RentalAdvancedSearchComponent,
    RentalPricingComponent,
    TermsConditionsComponent,
    ConfirmationComponent,
    TimerComponent
  ]
})
export class CarRentalModule { }
