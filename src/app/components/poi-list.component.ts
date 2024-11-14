import { Component, input, output } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list';
import { Pointsofinterest } from '../model/open-ai';

@Component({
  selector: 'app-poi-list',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatDivider
  ],
  template: `
    <mat-list>
      @for(poi of pois(); track $index) {
        <mat-list-item
          style="margin: 1rem 0"
          [disabled]="selected(poi)"
          (click)="poiClick.emit(poi)"
        >
          <div>{{poi.name}}</div>
          <small style="color: #999">
            {{poi.description}}
            {{poi.coordinates.latitude}}
            {{poi.coordinates.longitude}}
          </small>
        </mat-list-item>
        <mat-divider />
      }
    </mat-list>
  `,
  styles: ``
})
export class PoiListComponent {
  pois = input<Pointsofinterest[]>()
  poiClick = output<Pointsofinterest>()
  selectedPoi = input.required<Pointsofinterest | null>()

  selected(poi: Pointsofinterest) {
    return (poi.coordinates.latitude === this.selectedPoi()?.coordinates.latitude) &&
      (poi.coordinates.longitude === this.selectedPoi()?.coordinates.longitude)
  }
}
