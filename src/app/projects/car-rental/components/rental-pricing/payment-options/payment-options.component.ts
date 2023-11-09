import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class PaymentOptionsComponent {
    showSidePanel: boolean = false;
    showSidePanel1: boolean = false;
  
    constructor(public dialog: MatDialog) { }
  
  
    openSidePanel() {
      this.showSidePanel = !this.showSidePanel;
    }
    openCancellation() {
      this.showSidePanel1 = !this.showSidePanel1;
    }
}
