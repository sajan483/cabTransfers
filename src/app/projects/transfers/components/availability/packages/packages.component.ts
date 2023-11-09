import { Component, Input, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { SelectPopupComponent } from '../select-popup/select-popup.component';
import { CommonModule } from '@angular/common';
import { SidepanelComponent } from 'src/app/projects/shared/sidepanel/sidepanel.component';
import { ViewmorePanelComponent } from '../viewmore-panel/viewmore-panel.component';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';
import { StringFormatPipe } from 'src/app/projects/pipes/string-format.pipe';

@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SidepanelComponent,
        ViewmorePanelComponent,
        StringFormatPipe
    ]
})
export class PackagesComponent implements OnInit{
    @Input() availability: any
    
    showSidePanel = false;
    selectedItem: {} = {};
    title!: string;

    private generalHelper = new GeneralHelper();
    // private stringFormatPipe = new StringFormatPipe();

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {}
    
    openSidePanel(item: any) {
        if (this.isValidItem(item)) {
            this.selectedItem = item;
            this.setTitle(item);
        }
        this.showSidePanel = !this.showSidePanel;
    }
    
    isValidItem(item: any): boolean {
        return item && Object.keys(item).length > 0;
    }
    
    setTitle(item: any) {
        if (this.isValidItem(item)) {
          const { transferType, vehicledetails: { vehicle } } = item;
          this.title = `${transferType} ${vehicle}`;
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SelectPopupComponent, {
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    setDataForBooking(item:any) {
        if (this.isValidItem(item)) {
            this.generalHelper.keepInSession('transfersSelectedItem',item)
        }
        this.openDialog()
    }
}