import { Component, Input, SimpleChanges } from '@angular/core';
import { trigger, animate, style, transition, state, group } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PaxDetailsStateService } from 'src/app/projects/services/paxdetails/pax-details-state.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fare-details',
  templateUrl: './fare-details.component.html',
  styleUrls: ['./fare-details.component.scss'],
  animations: [
    trigger('filterAnimation', [
      state('state1',
        style(
          {
            opacity: 0,
            height: 0,
            overflow: 'hidden',
            transform: 'translateY(100vh)'
          }
        )
      ),
      state('state2',
        style(
          {
            opacity: 1,
            height: '*',
            transform: 'translateY(0)'
          }
        )
      ),
      transition('state1 <=> state2', animate('0.3s'))
    ]
    ),
    trigger('OverlayAnimation', [
      state('state1', style({
        opacity: 0,
        'pointer-events': 'none'
      })),
      state('state2', style({
        opacity: 1
      })),
      transition('state1 <=> state2', animate('0.3s'))
    ]),
    trigger("detailsAnimation", [
      transition(':enter', [
        style({
          height: 0, opacity: 0
        }),
        animate('0.3s', style({
          height: '*', opacity: 1
        }))
      ]),
      transition(':leave', animate('0.3s', style({
        height: 0, opacity: 1
      })))
    ])
  ],
  standalone: true,
  imports: [CommonModule]
})
export class FareDetailsComponent {
  @Input() netFareVisibility;
  fareDetails;
  details: boolean = true;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public paxStateService: PaxDetailsStateService) { }

  showDetails() {
    this.details = !this.details;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.netFareVisibility = changes['netFareVisibility'].currentValue;
  } 

  ngOnInit() {
    this.paxStateService.pricingresponse.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.fareDetails = result;
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
