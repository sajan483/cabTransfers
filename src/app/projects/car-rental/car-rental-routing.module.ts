import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarRentalComponent } from './car-rental.component';
import { HomeComponent } from './components/home/home.component';
import { CompareComponent } from './components/compare/compare.component';
import { RentalAvailabilityComponent } from './components/rental-availability/rental-availability.component';
import { RentalPricingComponent } from './components/rental-pricing/rental-pricing.component';
import { SelectCarComponent } from './components/select-car/select-car.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '', component: CarRentalComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'availability',
        component: RentalAvailabilityComponent,
      },
      {
        path: 'compare',
        component: CompareComponent,
      },
      {
        path: 'pricing',
        component: RentalPricingComponent,
      },
      {
        path: 'selectcar',
        component: SelectCarComponent,
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRentalRoutingModule { }
