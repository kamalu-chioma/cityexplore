import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormMapFiltersComponent } from './components/form-map-filters.component';
import { FormSearchComponent } from './components/form-search.component';
import { PoiListComponent } from './components/poi-list.component';
import { PoiMapComponent } from './components/poi-map.component';
import { MapFiltersService } from './services/map-filters.service';
import { PoiService } from './services/poi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatProgressBar,
    MatDivider,
    MatIcon,
    FormSearchComponent,
    FormMapFiltersComponent,
    PoiListComponent,
    PoiMapComponent,
    JsonPipe
  ],
  template: `

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened fixedInViewport>
        <h3 style="margin: 10px">
          <mat-icon style="transform: scale(1.5);">pin_drop</mat-icon>
          Travel AI
        </h3>

        <app-form-search (search)="poiService.loadPoi($event.city, $event.description)"/>

        <div style="margin: 1rem 0">
          @if (poiService.pending()) {
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          }
        </div>

        @if (poiService.poisAreAvailable()) {
          <app-form-map-filters
            (toggleBike)="filtersService.updateFilter('bike', $event)"
            (toggleTraffic)="filtersService.updateFilter('traffic', $event)"
            (toggleTransit)="filtersService.updateFilter('transit', $event)"
          />
          {{filtersService.filters() | json}}
        }
        <app-poi-list
          [pois]="poiService.pois()"
          [selectedPoi]="poiService.selectedPoi()"
          (poiClick)="poiService.changeSelectedPoi($event)"
        />
      </mat-sidenav>

      <mat-sidenav-content>
        @if (poiService.poisAreAvailable() ) {
          <app-poi-map
            [pois]="poiService.pois()"
            [layerFilters]="filtersService.filters()"
            [center]="poiService.centerPosition()"
          />
        }
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `
})
export class AppComponent {
  poiService = inject(PoiService);
  filtersService = inject(MapFiltersService)
}
