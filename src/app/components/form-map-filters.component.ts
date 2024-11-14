import { Component, output } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-form-map-filters',
  standalone: true,
  imports: [MatSlideToggle],
  template: `
    <div style="display: flex; gap: 1rem">
      <mat-slide-toggle labelPosition="after" (change)="toggleTransit.emit($event.checked)">
        Transit
      </mat-slide-toggle>
      <mat-slide-toggle labelPosition="after" (change)="toggleTraffic.emit($event.checked)">
        Traffic
      </mat-slide-toggle>
      <mat-slide-toggle labelPosition="after" (change)="toggleBike.emit($event.checked)">
        Bike
      </mat-slide-toggle>
    </div>
  `,
  styles: ``
})
export class FormMapFiltersComponent {
  toggleTransit = output<boolean>()
  toggleTraffic = output<boolean>()
  toggleBike = output<boolean>()
}
