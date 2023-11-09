import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Animations } from 'src/app/projects/shared/animations/animation';
import { SidepanelComponent } from 'src/app/projects/shared/sidepanel/sidepanel.component';
import { ViewmorePanelComponent } from '../../availability/viewmore-panel/viewmore-panel.component';
import { CancellationPolicyComponent } from '../cancellation-policy/cancellation-policy.component';
import { CommonModule } from '@angular/common';
import { StorageHelper } from 'src/app/projects/helper/storage-helper';
import { PaxDetailsStateService } from 'src/app/projects/services/paxdetails/pax-details-state.service';
import { Subject, takeUntil } from 'rxjs';
import { TimeConvert } from 'src/app/projects/pipes/time.pipe';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';
@Component({
  selector: 'app-transfers-detail',
  templateUrl: './transfers-detail.component.html',
  styleUrls: ['./transfers-detail.component.scss'],
  animations: [Animations.openCloseTrigger],
  standalone: true,
  imports: [
    SidepanelComponent,
    ViewmorePanelComponent,
    CancellationPolicyComponent,
    CommonModule,
    TimeConvert
  ]
})
export class TransfersDetailComponent {
  showSidePanel: boolean = false;
  showSidePanel1: boolean = false;
  showDetails: boolean = false;
  public Display: any = [];

  packageJson = [
    {
      imageUrl: 'url(assets/images/availability/baleno.png)',
      category: 'Private',
      section: 'Premium Minibus',
      service: [
        {
          icon: 'van',
          name: 'Door to Door Service',
        },
        {
          icon: 'fast-time',
          name: 'No Waiting Time For The Customer',
        },

      ],
      supplierWaiting: 'Maximum supplier waiting time',
      waitingTime: '75 min',

      listItem: [
        'Exclusive ride for you',
        'Meet & Greet service',
        '1 item of hand baggage allowed per person'
      ],
      viewMore: 'View more details',
      amount: 'AED 2,307',
      selectLink: 'Select',
    },
  ]

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  transferDetails: any;

  openSidePanel() {
    this.showSidePanel = !this.showSidePanel;
  }
  openCancellation() {
    this.showSidePanel1 = !this.showSidePanel1;
  }
  constructor(
    public dialog: MatDialog,
    private storageHelper: StorageHelper, public paxStateService: PaxDetailsStateService, public generalHelper: GeneralHelper) { }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  ngOnInit() {
    this.Display = this.storageHelper.getFormGroupFromStorage("FlightCodeTransfer"); 
    this.paxStateService.pricingresponse.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({next: (result) => {
        this.transferDetails = result && result.lenght != 0 ? result[0] : [];
      }, error: () =>{}
    })
  }

  vehicleImage(image){
    return image ? image : 'https://b2bbeta1revamp.akbartravelsonline.com/assets/img/hotel/no-image-found.jpg'
  }

  countryName(countryCode){
    const country = this.generalHelper.getFromlocalStore("country");
    return country.find(res => res.code == countryCode) ? country.find(res => res.code == countryCode).name : '';
  }

  arrayConverter(data : any[]){
    return data
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}