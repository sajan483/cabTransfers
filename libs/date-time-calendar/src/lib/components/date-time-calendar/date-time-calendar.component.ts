import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import moment from "moment";
import range from "lodash.range";
import { debounceTime, distinctUntilChanged, fromEvent } from "rxjs";

export interface CalendarDate {
  mDate: moment.Moment; // moment date object
  today?: boolean;  // is it today
  selected?: boolean; // is the date selected
  hidden?: boolean; // show the date be hidden in a month; hide next & prev months date from current month
  inactive?: boolean; // is the date before the today
  weekend?: boolean;  // is it weekend
  inbetween?: boolean;  // is the date between selected two dates
  columnInCalendar?: number; // column position in calendar (x axis)
  rowInCalendar?: number; // row position in calendar (y axis)
  id?: number; // month index
  fare?: string;  // fare to be shown in a day
  holiday?: string; // holiday to be shown in a day
}

@Component({
  selector: "lib-date-time-calendar",
  templateUrl: "./date-time-calendar.component.html",
  styleUrls: ["./date-time-calendar.component.scss"]
})
export class DateTimeCalendarComponent implements OnInit {
  /**
   * setting datepicker to TRUE shows only datepicker
   */
  @Input() datepicker: boolean = false;
  
  /**
   * setting verticalCalendar to TRUE opens full screen calendar to be used for Mobile devices
   */
  verticalCalendar: boolean = false;
  
  @Input() dateTime = null;
  startDate = null;
  time = null;
  /**
   *  total number of months to be displayed
   */
  @Input() monthsLimit: number = 12;
  /**
   * headings to be displayed on top of the date-time calendar
   */
  @Input() dateTimeOptions = {
    firstOption: { text: 'Date', selected: true },
    secondOption: { text: 'Time', selected: false },
    topHeading: 'Select Date & Time'
  };
  /**
   * event triggered when calendar closes
   */
  @Output() close = new EventEmitter();

  currentDate: moment.Moment;
  namesOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weeks: Array<CalendarDate[]> = [];
  selectedDate;
  months = [];
  yymmAddedNumber = [];
  yymmAddedText = [];
  prevDate;
  startLimit: number = 0;
  endLimit: number = 0;
  selectedMonths = [];
  timeArray = [];
  viewInitialized: boolean = false;

  constructor(private renderer: Renderer2, private eRef: ElementRef) { }

  ngOnInit() {
    this.checkWindowSize();

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time12 = moment({ hour, minute }).format("hh:mm A");
        const time24 = moment({ hour, minute }).format("HH:mm");
        // this.timeArray.push([time12, time24.format("HH:mm")]);
        this.timeArray.push({ time12, time24, selected: false, disabled: false });
      }
    }

    if(this.dateTime) {
        if(this.dateTime.time) {
          this.time = this.timeArray.find((t) => t.time24 === this.dateTime.time.time24);
          
          if(this.time) {
            this.time.selected = true;
          }
        }
    }

    this.currentDate = moment();
    this.selectedDate = moment(this.currentDate);
    this.prevDate = this.currentDate;
    this.generateCalendar();

    if (this.verticalCalendar) {
      for (let i = 0; i < this.monthsLimit; i++) {
        this.createNextMonths();
      }
      this.endLimit = this.monthsLimit + 1;
    } else {
      this.nextMonth();
      this.endLimit = this.startLimit + 2;
    }
  }

  ngAfterViewInit() {
    // this.zone.runOutsideAngular(() => {
    //   fromEvent(window, 'resize').pipe(
    //     debounceTime(100),
    //     distinctUntilChanged()
    //   ).subscribe(() => {
    //     this.zone.run(() => {
    //       this.checkWindowSize();
    //     });
    //   });
    // });
    
    setTimeout(() => {
      this.viewInitialized  = true;
    }, 500);
  }
  
  checkWindowSize() {
    if(window.innerWidth < 500) {
      this.verticalCalendar = true;
      this.renderer.addClass(document.body, 'scroll-hidden');
    } else {
      this.verticalCalendar = false;
    }
  }

  showMonths() {
    console.log("yymmAddedNumber ", this.yymmAddedNumber);
    console.log("yymmAddedText ", this.yymmAddedText);
    console.log("months ", this.months);
  }

  addMonthsToList() {
    /**
     * adds a new month to the list of months
     */
    let date = moment(this.currentDate).format("YYYY-MM");

    if (!this.yymmAddedNumber.some((d) => d === date)) {
      if (this.currentDate > this.prevDate) {
        this.yymmAddedNumber.push(date);
        this.yymmAddedText.push(moment(date).format("MMMM YYYY"));
        this.months.push(this.weeks);
      } else {
        this.yymmAddedNumber.unshift(date);
        this.yymmAddedText.unshift(moment(date).format("MMMM YYYY"));
        this.months.unshift(this.weeks);
      }
    }
  }

  private generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);

    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;

    this.addMonthsToList();
    this.prevDate = this.currentDate;
  }

  private fillDates(currentMoment: moment.Moment) {
    /**
     * create a month data
     */
    const firstOfMonth = moment(currentMoment).startOf("month").day();
    const lastOfMonth = moment(currentMoment).endOf("month").day();

    const firstDayOfGrid = moment(currentMoment)
      .startOf("month")
      .subtract(firstOfMonth, "days");
    const lastDayOfGrid = moment(currentMoment)
      .endOf("month")
      .subtract(lastOfMonth, "days")
      .add(7, "days");

    const startCalendar = firstDayOfGrid.date();

    return range(
      startCalendar,
      startCalendar + lastDayOfGrid.diff(firstDayOfGrid, "days")
    ).map((date) => {
      const newDate = moment(firstDayOfGrid).date(date);

      return {
        today: this.isToday(newDate),
        selected: false,
        mDate: newDate,
        hidden: this.isInCurrentMonth(newDate),
        inactive: this.isInactive(newDate),
        weekend: this.isWeekend(newDate),
        columnInCalendar: this.findDayInWeek(newDate),
        id: this.months.length,
        fare: '40.5K',
        holiday: 'Holidays to be shown here upon hovering'
      };
    });
  }

  public prevMonth(): void {
    /**
     * to show previous month if it exist, or creates a month before
     */
    if (
      moment(this.currentDate).format("MMMM YYYY") === this.yymmAddedText[1]
    ) {
      return;
    }

    this.currentDate = moment(this.currentDate).subtract(1, "months");
    this.generateCalendar();

    if (this.startLimit == 0) {
      this.endLimit = 2;
    } else {
      this.startLimit -= 1;
      this.endLimit -= 1;
    }
  }

  public nextMonth(): void {
    /**
     * to show next month if it exist, or creates a month ahead
     */
    if (this.endLimit == this.monthsLimit + 1) {
      return;
    }

    this.currentDate = moment(this.currentDate).add(1, "months");
    this.generateCalendar();

    if (this.months.length == 2) {
      this.startLimit = 0;
      this.endLimit = 2;
      return;
    }

    this.startLimit += 1;
    this.endLimit += 1;
  }

  createNextMonths() {
    this.currentDate = moment(this.currentDate).add(1, "months");
    this.generateCalendar();
  }

  public isDisabledMonth(currentDate): boolean {
    const today = moment();
    return moment(currentDate).isBefore(today, "months");
  }

  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), "day");
  }

  private isSelected(date: moment.Moment): boolean {
    return (
      moment(this.selectedDate).format("DD/MM/YYYY") ===
      moment(date).format("DD/MM/YYYY")
    );
  }

  private isInCurrentMonth(date: moment.Moment): boolean {
    return !moment(date).isSame(this.currentDate, "month");
  }

  private isInactive(date: moment.Moment): boolean {
    const today = moment().startOf("day");
    return (
      moment(date).isBefore(today) ||
      moment(date).isAfter(today.add(1, "years"))
    );
  }

  private isWeekend(date: moment.Moment) {
    return moment(date).day() % 6 == 0;
  }

  private findDayInWeek(date: moment.Moment) {
    return moment(date).day();
  }

  onDateSelected(day: CalendarDate) {
    /**
     * gets invoked when a date is clicked
     */
    this.onSingleDateSelect(day);
  }

  private onSingleDateSelect(day: CalendarDate) {
    /**
     * gets invoked if the calendar is set to select only single dates
     */
    if (this.startDate) {
      let
        prevSelectedDate = moment(this.startDate.mDate),
        prevSelectedDateMMYY = prevSelectedDate.format("MMMM YYYY"),
        prevSelectedDateMonthIndex = this.yymmAddedText.indexOf(prevSelectedDateMMYY),
        prevSelectedWeekNo = prevSelectedDate.weeks() - prevSelectedDate.clone().startOf("month").weeks(),
        prevSelected = this.months[prevSelectedDateMonthIndex][prevSelectedWeekNo][prevSelectedDate.day()];
      prevSelected.selected = false;
    }

    let
      currSelectedDate = moment(day.mDate),
      currentSelectedDateMMYY = currSelectedDate.format("MMMM YYYY"),
      currentSelectedDateMonthIndex = this.yymmAddedText.indexOf(currentSelectedDateMMYY),
      currSelectedWeekNo = currSelectedDate.weeks() - currSelectedDate.clone().startOf("month").weeks(),
      currSelected = this.months[currentSelectedDateMonthIndex][currSelectedWeekNo][day.columnInCalendar];
    currSelected.rowInCalendar = currSelectedWeekNo;
    currSelected.selected = true;

    this.startDate = currSelected;
    return;
  }

  highlightFirstTab() {
    this.dateTimeOptions.firstOption.selected = true;
    this.dateTimeOptions.secondOption.selected = false;
  }

  highlightSecondTab() {
      this.dateTimeOptions.firstOption.selected = false;
      this.dateTimeOptions.secondOption.selected = true;
  }

  trackByFn(index, item) {
    return index;
  }

  closeCalendar(returnValue: boolean = false) {
    /**
     * gets invoked when the calendar is closed
     */
    if (returnValue) {
      this.close.emit({
        startDate: this.startDate ? moment(this.startDate.mDate).format() : null,
        time:  this.time? {time12: this.time.time12, time24: this.time.time24} : null
      });
      return;
    }
    this.close.emit(null);
  }

  overlayClicked() {
    this.closeCalendar(true);
  }

  onTimeClick(id) {
    if (this.time) {
      this.timeArray[this.time.id].selected = false;
    }
    this.time = { id, ...this.timeArray[id] };
    this.timeArray[id].selected = true;
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'scroll-hidden');
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.viewInitialized) {
      if(!this.eRef.nativeElement.contains(event.target)) {
        this.close.emit();
      }
    }
  }
}
