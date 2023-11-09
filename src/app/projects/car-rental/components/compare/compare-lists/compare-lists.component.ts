import { Component } from '@angular/core';
import { Animations } from 'src/app/projects/shared/animations/animation';

@Component({
  selector: 'app-compare-lists',
  templateUrl: './compare-lists.component.html',
  styleUrls: ['./compare-lists.component.scss'],
  animations: [ Animations.openCloseTrigger ]
})
export class CompareListsComponent {
  showInclusions: boolean=false;

  toggleInclusions() {
    this.showInclusions = !this.showInclusions;    
  }
}
