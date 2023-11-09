import { Component, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss'],
})
export class SidepanelComponent {
    @Input() heading!: string;
    @Output() closeMenu = new EventEmitter();
    hide: boolean = false;
  
    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}
  
    ngOnInit() {
      this.renderer.addClass(this.document.body, 'scroll-hidden')
    }
    
    close() {
      this.hide = true;
      setTimeout(() => {
        this.closeMenu.emit();
      }, 550);
    }
    
    ngOnDestroy() {
      this.renderer.removeClass(this.document.body, 'scroll-hidden');
    }
}
