import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { environment } from '../environments/environment'; // Import environment

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
          Discover Your City's Hotspots
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
export class AppComponent implements OnInit {
  poiService = inject(PoiService);
  filtersService = inject(MapFiltersService);

  ngOnInit(): void {
    this.loadGoogleMapsScript();
  }

  // Dynamically load Google Maps script
  private loadGoogleMapsScript(): void {
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }
}

// Define the `initMap` function globally
declare global {
  interface Window {
    initMap: () => void;
  }
}

window.initMap = () => {
  console.log('Google Maps API loaded successfully.');
  // You can initialize the map here if needed, or delegate it to another component
};
