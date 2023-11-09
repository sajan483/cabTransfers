import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './projects/transfers/components/home/home.component';
import { AvailabilityComponent } from './projects/transfers/components/availability/availability.component';
import { PaxDetailComponent } from './projects/transfers/components/pax-detail/pax-detail.component';
import { ConfirmationComponent } from './projects/transfers/components/confirmation/confirmation.component';
import { canActivateChild } from './projects/auth-guard/auth-guard';

const routes: Routes = [
  {
    path: 'transfers/availability',component: AvailabilityComponent,canActivate:[canActivateChild],
  },
  {
    path: 'transfers/paxdetail',component: PaxDetailComponent,canActivate:[canActivateChild],
  },
  {
    path: 'transfers/confirmation',component: ConfirmationComponent,canActivate:[canActivateChild],
  },
  {
    path: 'car-rental', loadChildren: () => import('./projects/car-rental/car-rental.module').then(c => c.CarRentalModule),
  },
  {
    path: 'cab', component: HomeComponent,
  },
  {
    path: '**', redirectTo: 'cab',pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}