import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditAndDebitCardComponent } from './credit-and-debit-card/credit-and-debit-card.component';
import { NetBankingComponent } from './net-banking/net-banking.component';
import { UpiComponent } from './upi/upi.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    UpiComponent,
    NetBankingComponent,
    CreditAndDebitCardComponent,
  ],
  exports: [
    UpiComponent,
    NetBankingComponent,
    CreditAndDebitCardComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule

  ]
})
export class PaymentModule { }
