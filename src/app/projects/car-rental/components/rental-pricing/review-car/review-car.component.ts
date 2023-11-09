import { Component } from '@angular/core';
import { InclusionsPopupComponent } from '../../inclusions-popup/inclusions-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Animations } from 'src/app/projects/shared/animations/animation';
@Component({
  selector: 'app-review-car',
  templateUrl: './review-car.component.html',
  styleUrls: ['./review-car.component.scss'],
  animations: [Animations.openCloseTrigger]
})
export class ReviewCarComponent {
  showDetails: boolean = false;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(InclusionsPopupComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
