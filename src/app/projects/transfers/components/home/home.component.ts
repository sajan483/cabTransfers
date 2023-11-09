import { Component } from '@angular/core';
import { SharedHomeComponent } from 'src/app/projects/home/home/shared-home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    SharedHomeComponent
  ]
})
export class HomeComponent {

}
