import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InclusionsPopupComponent } from '../../inclusions-popup/inclusions-popup.component';
import { ComparePopupComponent } from '../../compare-popup/compare-popup.component';
import { EmailPopupComponent } from '../../../shared/email-popup/email-popup.component';

@Component({
  selector: 'app-rental-display',
  templateUrl: './rental-display.component.html',
  styleUrls: ['./rental-display.component.scss']
})
export class RentalDisplayComponent {
  showSidePanel: boolean = false;
  showFilter: boolean = false;

  constructor(public dialog: MatDialog) { }

  openSidePanel() {
    this.showSidePanel = !this.showSidePanel;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(InclusionsPopupComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openshareDialog(): void {
    const dialogRef = this.dialog.open(EmailPopupComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  compareDialog(): void {
    const dialogRef = this.dialog.open(ComparePopupComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
}
