import { Component, OnDestroy, OnInit } from '@angular/core';
import { PackagesComponent } from './packages/packages.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { InfoComponent } from './info/info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GeneralApiService } from 'src/app/projects/services/general/general-api-service';
import { environment } from 'src/app/environments/environment';
import { AvailabilityAndBookingAdapter } from '../../adapter/availability&booking-adapter';
import { AvailabilityLoaderComponent } from 'src/app/projects/shared/loaders/availability-loader/availability-loader.component';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NodataComponent } from 'src/app/projects/shared/availability-errors/nodata/nodata.component';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  standalone: true,
  imports: [
    PackagesComponent,
    AdvancedSearchComponent,
    InfoComponent,
    MatDialogModule,
    AvailabilityLoaderComponent,
    CommonModule,
    MatFormFieldModule,
    NodataComponent
  ],
  providers: [
    GeneralApiService,
    { provide: 'environment', useValue: environment },
  ],
})
  
export class AvailabilityComponent implements OnInit, OnDestroy{
  availability: any[] = [];
  isLoading = true;
  isNodata = false;
  
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private availabilityAdapter = new AvailabilityAndBookingAdapter()
  private generalHelper = new GeneralHelper()

  constructor(private apiService:GeneralApiService) {}
 
  ngOnInit(): void {
   this.getAvailability()
  }

  getAvailability() {
    const searchRequest = this.generalHelper.getFromlocalStore('SearchRequest')
    if (typeof(searchRequest) !== undefined){
      this.apiService.getTransfersAvailability(this.availabilityAdapter.createTrasfersAvailabilityRequest(searchRequest))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (x) => {
            if (x && x.response && Array.isArray(x.response) && x.response.length > 0) {
              const transferArray = x.response[0].transfers?.transfer;
              this.isLoading = false;
      
              this.availability = [];
              if (Array.isArray(transferArray)) {
                for (const transfer of transferArray) {
                  this.availability.push(transfer);
                }
              }
            } else {
              this.isLoading = false;
              this.isNodata = true;
            }
          },
          error: () => {
            this.isLoading = false;
            this.isNodata = true;
          }
        });
    }
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
}