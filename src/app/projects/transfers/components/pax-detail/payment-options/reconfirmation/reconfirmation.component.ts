import { Component } from '@angular/core';
import { TransfersDetailComponent } from '../../transfers-detail/transfers-detail.component';
import { PassengerDetailsComponent } from 'src/app/projects/transfers/shared/passenger-details/passenger-details.component';
import { FareDetailComponent } from 'src/app/projects/car-rental/shared/fare-detail/fare-detail.component';
import { PaymentMethodComponent } from 'src/app/projects/transfers/shared/payment-method/payment-method.component';
import { ContactDetailComponent } from 'src/app/projects/transfers/shared/contact-detail/contact-detail.component';

@Component({
  selector: 'app-reconfirmation',
  templateUrl: './reconfirmation.component.html',
  styleUrls: ['./reconfirmation.component.scss'],
  standalone: true,
  imports: [
    TransfersDetailComponent,
    PassengerDetailsComponent,
    FareDetailComponent,
    PaymentMethodComponent,
    ContactDetailComponent
  ],
})
export class ReconfirmationComponent {

}
