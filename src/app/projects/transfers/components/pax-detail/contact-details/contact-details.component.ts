import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PricingAdapter } from '../../../adapter/pricing-adapter';
import { PricingStateService } from 'src/app/projects/services/pricing/pricing-state-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class ContactDetailsComponent {

  private pricingAdapter = new PricingAdapter(this.formBuilder, this.pricingState)
  @ViewChild('contactEle')contactEle: ElementRef;
  ContactDetailsValidationSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private pricingState: PricingStateService
  ) {
    this.createContactInfoFormGroup();
    this.ContactDetailsValidationSubscription = this.pricingState.getContactInfoValidationData().subscribe(value=> {
      if (value == true) {
        this.scrollIntoContactElement();
      }
    });
  }

  createContactInfoFormGroup() {
    this.pricingAdapter.contactInfoFormGroupInState()
  }

  public get ContactDetailsFormGroup(): FormGroup { 
    return this.pricingState.ContactDetailsFormGroup;
  }

  scrollIntoContactElement() {
    this.contactEle.nativeElement.scrollIntoView({ behavior: 'smooth'});
  }

  onKeyPress(event: KeyboardEvent) {
    const pressedChar = event.key;
    if(isNaN(Number(pressedChar)) || pressedChar === ' ') {
      event.preventDefault();
    }
  }

  ngOnDestroy(): void {
    this.ContactDetailsValidationSubscription.unsubscribe();
  }
}
