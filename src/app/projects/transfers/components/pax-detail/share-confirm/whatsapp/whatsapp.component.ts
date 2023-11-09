import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule
  ]
})
export class WhatsappComponent {

}
