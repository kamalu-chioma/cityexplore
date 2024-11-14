import { Component, computed, effect, input, viewChild, viewChildren } from '@angular/core';
import {
  GoogleMap, MapBicyclingLayer, MapInfoWindow,
  MapMarker, MapTrafficLayer, MapTransitLayer,
} from '@angular/google-maps';
import { Pointsofinterest } from '../model/open-ai';
import { MapFilters } from '../services/map-filters.service';

@Component({
  selector: 'app-poi-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, MapTrafficLayer, MapTransitLayer, MapBicyclingLayer, MapInfoWindow],
  template: `
    <google-map
      [center]="center()" [zoom]="zoom"
      [height]="mapHeight()"
      width="100%"
      #gmap
    >
      @if (layerFilters()?.traffic) {
        <map-traffic-layer [autoRefresh]="false"/>
      }
      @if (layerFilters()?.transit) {
        <map-transit-layer/>
      }
      @if (layerFilters()?.bike) {
        <map-bicycling-layer/>
      }


      @for (position of markers(); track position) {
        <map-marker
          [position]="position"
          #marker="mapMarker"
          (mapClick)="openInfoWindow($index)"
        />
        <map-info-window style="color: black">
          <h5>{{ position.name }}</h5>
          <p>{{ position.description }}</p>
        </map-info-window>
      }

    </google-map>
  `,
})
export class PoiMapComponent {
  pois = input.required<Pointsofinterest[]>()
  center = input.required<google.maps.LatLngLiteral>()
  gmapInstance = viewChild<GoogleMap>('gmap')
  layerFilters = input<MapFilters>()
  infoWindow = viewChildren(MapInfoWindow);
  markersRefs = viewChildren<MapMarker>('marker')
  constructor() {
    // pois changes
    effect(async () => {
      // fit bounds
      this.fitBounds(this.pois())
    });
  }

  markers = computed(() => {
    return this.pois()?.map(poi => {
      return { lat: poi.coordinates.latitude, lng: poi.coordinates.longitude, name: poi.name, description: poi.description }
    })
  })


  mapHeight = computed(() => {
    return  window.innerHeight
  })
  zoom = 10;

  async fitBounds(pois: Pointsofinterest[]) {
    const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
    const bounds = new LatLngBounds();

    pois.forEach((place) => {
      bounds.extend({ lat: place.coordinates.latitude, lng: place.coordinates.longitude });
    });

    this.gmapInstance()?.fitBounds(bounds);
  }
  openInfoWindow( index: number) {
    this.infoWindow().forEach(w => w.close())
    this.infoWindow()[index].open(this.markersRefs()[index]);
  }
}
