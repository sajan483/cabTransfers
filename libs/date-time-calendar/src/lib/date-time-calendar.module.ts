import { NgModule } from '@angular/core';
import { DateTimeCalendarComponent } from './components/date-time-calendar/date-time-calendar.component';
import { WeekComponent } from './components/week/week.component';
import { MonthComponent } from './components/month/month.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DateTimeCalendarComponent, MonthComponent, WeekComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    DateTimeCalendarComponent
  ]
})
export class DateTimeCalendarModule { }
