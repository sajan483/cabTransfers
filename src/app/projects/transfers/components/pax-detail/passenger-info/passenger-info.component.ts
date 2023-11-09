import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PricingAdapter } from '../../../adapter/pricing-adapter';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PricingStateService } from 'src/app/projects/services/pricing/pricing-state-service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GeneralHelper } from 'src/app/projects/helper/general-helper';
import { StringValidatorDirective } from 'src/app/projects/directives/string-validator.directive';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    StringValidatorDirective
  ]
})
export class PassengerInfoComponent {

  private pricingAdapter = new PricingAdapter(this.formBuilder, this.pricingState);
  private generalHelper = new GeneralHelper();
  public showChild = false;
  paxValidationSubscription: Subscription;
  childValidationSubscription: Subscription;
  @ViewChild('paxEle') paxEle: ElementRef;
  @ViewChild('childEle') childEle: ElementRef;
  Titles = [{ value: 'Mr' }, { value: 'Ms' }, { value: 'Mrs' }];
  TitlesChild = [{ value: 'Mr' }, { value: 'Ms' }];

  constructor(
    private formBuilder: FormBuilder,
    private pricingState: PricingStateService
  ) {
    this.createPassengerFormGroup();
    this.paxValidationSubscription = this.pricingState.getPaxValidationData().subscribe(value=> {
      if (value == true) {
        this.scrollntoPaxElement();
      }
    });
    this.childValidationSubscription = this.pricingState.getChildValidataData().subscribe(value => {
      if (value == true) {
        this.scrollIntoChildElement();
      }
    });
  }

  ngOnInit() {
    const value = this.generalHelper.getFromlocalStore("SearchRequest");
    const paxcnt = value.adult;
    for (let i = 1; i < paxcnt; i++) {
        this.pricingAdapter.createAdult();
    }  
    const childcnt = value.child;
    if (childcnt > 0 ) {
      this.showChild = true;
      this.pricingAdapter.createChildFormGroup();
      for (let i = 1; i < childcnt; i++) {
        this.pricingAdapter.createChild();
      }
    }
  }

  createPassengerFormGroup() {
    this.pricingAdapter.createPaxFormGroup();
  }

  public get PaxDetails() {
    return this.pricingState.PaxDetailsFormGroup;
  }

  public get ChildDetails() {
    return this.pricingState.ChildDetailsFormGroup;
  }

  get adultControls() {
    return this.PaxDetails.get('Adult') as FormArray;
  }

  get childControls() {
    return this.ChildDetails.get('Child') as FormArray;
  }

  scrollntoPaxElement() {
    this.paxEle.nativeElement.scrollIntoView({ behavior: 'smooth'});
  }

  scrollIntoChildElement() {
    this.childEle.nativeElement.scrollIntoView({ behavior: 'smooth'});
  }

  ngOnDestroy(): void {
    this.paxValidationSubscription.unsubscribe();
    this.childValidationSubscription.unsubscribe();
    this.PaxDetails?.reset();
    this.ChildDetails?.reset();
    sessionStorage.removeItem("PassengerDetails");
  }
}