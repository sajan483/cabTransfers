import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class TransfersComponent {

}
