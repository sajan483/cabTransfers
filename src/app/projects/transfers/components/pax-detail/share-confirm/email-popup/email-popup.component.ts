import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.scss'],
  standalone:true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class EmailPopupComponent {

}
