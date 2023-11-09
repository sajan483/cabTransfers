import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SearchAdapter } from '../../../adapter/search-adapter';
import { SearchStateService } from 'src/app/projects/services/search/search-state-service';
import { StorageHelper } from 'src/app/projects/helper/storage-helper';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';

@Component({
  selector: 'app-select-popup',
  templateUrl: './select-popup.component.html',
  styleUrls: ['./select-popup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class SelectPopupComponent {

  private searchAdapter = new SearchAdapter(this.formBuilder, this.searchStateService);
  timeOptions: string[] = [];
  minuteOptions: string[] = [];
  public ShowValidationMessage = false;
  public ShowDepartureTransfer = false;
  public searchrequest: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SelectPopupComponent>,
    private searchStateService: SearchStateService,
    private storageHelper: StorageHelper,
    private generalHelper: GeneralHelper,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.createFormGroup(); 
    this.SetTimeOptions();
    this.searchrequest = this.generalHelper.getFromlocalStore("SearchRequest");
    
    if (this.searchrequest.tripType == "Round") {
      this.ShowDepartureTransfer = true;
    }
    else if (this.searchrequest.tripType == "OneWay") {
      this.ShowDepartureTransfer = false;
    }
  }

  createFormGroup() {
    this.searchAdapter.FlightCodeFormGroupInState();
  }

  public get FlightCodeTransferRequest(): any {
    return this.searchStateService.FlightCodeTransferRequest;
  }

  Continue() {
    if (this.FlightCodeTransferRequest.status == "INVALID" ) {
        this.ShowValidationMessage = true;
        this.generalHelper.markFormControlTouched(this.FlightCodeTransferRequest)
        return;
      
    }
    
    this.storageHelper.saveFormGroupToStorage("FlightCodeTransfer",this.FlightCodeTransferRequest.value);
    if (this.FlightCodeTransferRequest.status == "VALID" ) {
      this.ShowValidationMessage = false;
      this.router.navigateByUrl("/transfers/paxdetail");
      window.scrollTo(0,0); 
      this.closeDialog();
      this.dialogRef.afterClosed().subscribe(() => {
        window.scrollTo(0,0);
      })
    } 
  }

  SetTimeOptions() {
    for (let hour = 0; hour < 24; hour++) {
      const formattedTime = this.datePipe.transform(new Date().setHours(hour), 'HH');
      this.timeOptions.push(formattedTime);
   }
   for (let minute = 0; minute < 60; minute++) {
    const formattedTime = this.datePipe.transform(new Date().setMinutes(minute), 'mm');
    this.minuteOptions.push(formattedTime);
   }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}