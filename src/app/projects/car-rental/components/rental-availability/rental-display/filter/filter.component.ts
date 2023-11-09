import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() fullscreen: boolean = false;
  @Output() close = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (this.fullscreen) {
      this.renderer.addClass(document.body, 'scroll-hidden');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'scroll-hidden');
  }

  closeFilter() {
    this.close.emit();
  }
}
