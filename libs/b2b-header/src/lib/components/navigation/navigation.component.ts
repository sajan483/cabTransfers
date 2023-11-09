import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'lib-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  addToMore: number = 0;
  showSkeleton: boolean = false;
  menuskeleton: boolean = false;

  menuList = [
    { icon: 'b2b-header-flight', label: 'Flight' },
    { icon: 'b2b-header-hotel', label: 'Hotel' },
    { icon: 'b2b-header-life-insurance', label: 'Insurance' },
    { icon: 'b2b-header-holidays', label: 'Holidays' },
    { icon: 'b2b-header-cruise', label: 'Cruise' },
    { icon: 'b2b-header-visa', label: 'Visa' },
    { icon: 'b2b-header-tram-front-view', label: 'Rail Holiday' },
    { icon: 'b2b-header-bus', label: 'Bus' },
    { icon: 'b2b-header-tram-front-view', label: 'Rail' },
    { icon: 'b2b-header-card', label: 'Utilities' },
    { icon: 'b2b-header-profile', label: 'Passport' },
    { icon: 'b2b-header-offer', label: 'Offers' },
    { icon: 'b2b-header-moon', label: 'Umrah' },
    { icon: 'b2b-header-support', label: 'Support' },
  ];

  constructor() {}

  ngOnInit() {
    this.onResize();
  }

  get ShowSkeleton(): boolean {
    let showSkeleton;
    if (this.menuList && this.menuList.length > 0) {
      showSkeleton = false;
    } else {
      showSkeleton = true;
    }
    return showSkeleton;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    let width = window.innerWidth;

    if (width < 700) {
      return;
    }

    if (width < 1030) {
      if (width < 900) {
        if (width < 800) {
          this.addToMore = 4;
          return;
        }
        this.addToMore = 3;
        return;
      }
      this.addToMore = 2;
      return;
    } else if (width >= 1030 && width < 1200) {
      this.addToMore = 1;
    } else {
      this.addToMore = 0;
    }
  }
}
