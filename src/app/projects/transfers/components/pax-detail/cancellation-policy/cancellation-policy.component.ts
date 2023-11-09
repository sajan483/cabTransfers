import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.scss'],
  standalone:true
})
export class CancellationPolicyComponent {
  @Input() policy;
}
