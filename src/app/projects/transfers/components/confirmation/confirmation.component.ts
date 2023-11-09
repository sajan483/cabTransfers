import { Component } from '@angular/core';
import { TransfersDetailComponent } from '../pax-detail/transfers-detail/transfers-detail.component';
import { PassengerDetailsComponent } from '../../shared/passenger-details/passenger-details.component';
import { FareDetailComponent } from '../../shared/fare-detail/fare-detail.component';
import { PaymentMethodComponent } from '../../shared/payment-method/payment-method.component';
import { ContactDetailComponent } from '../../shared/contact-detail/contact-detail.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  imports: [
    TransfersDetailComponent,
    PassengerDetailsComponent,
    FareDetailComponent,
    PaymentMethodComponent,
    ContactDetailComponent
  ]
})
export class ConfirmationComponent {

}
