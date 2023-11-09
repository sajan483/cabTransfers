import { Component } from '@angular/core';
import { Animations } from 'src/app/projects/shared/animations/animation';

@Component({
  selector: 'app-select-car',
  templateUrl: './select-car.component.html',
  styleUrls: ['./select-car.component.scss'],
  animations: [ Animations.openCloseTrigger ]
})
export class SelectCarComponent {
  showInclusions: boolean=false;

  toggleInclusions() {
    this.showInclusions = !this.showInclusions;    
  }
}
