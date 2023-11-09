import { Component } from '@angular/core';
import { SidepanelComponent } from 'src/app/projects/shared/sidepanel/sidepanel.component';
import { SafeTravelComponent } from '../safe-travel/safe-travel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SidepanelComponent,
    SafeTravelComponent
  ]
})
export class InfoComponent {
    showSidePanel: boolean = false;
    openSidePanel() {
        this.showSidePanel = !this.showSidePanel;
    }
}
