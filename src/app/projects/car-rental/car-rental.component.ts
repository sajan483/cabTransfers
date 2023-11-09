import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CarRentalComponent {

}
