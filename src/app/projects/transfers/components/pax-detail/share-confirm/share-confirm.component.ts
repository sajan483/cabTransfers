import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
@Component({
  selector: 'app-share-confirm',
  templateUrl: './share-confirm.component.html',
  styleUrls: ['./share-confirm.component.scss'],
  standalone:true,
})
export class ShareConfirmComponent {
  showSidePanel: boolean = false;

  openSidePanel() {
    this.showSidePanel = !this.showSidePanel;
  }
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(WhatsappComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
