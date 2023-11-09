import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-viewmore-panel',
  templateUrl: './viewmore-panel.component.html',
  styleUrls: ['./viewmore-panel.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ViewmorePanelComponent {
  @Input() selectedItem: any;

}
