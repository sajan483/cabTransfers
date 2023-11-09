import { Component } from '@angular/core';
import { InclusionsPopupComponent } from '../../inclusions-popup/inclusions-popup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-upgrade-car',
  templateUrl: './upgrade-car.component.html',
  styleUrls: ['./upgrade-car.component.scss']
})
export class UpgradeCarComponent {
    constructor(public dialog: MatDialog) { }
    openDialog(): void {
        const dialogRef = this.dialog.open(InclusionsPopupComponent, {
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
}
