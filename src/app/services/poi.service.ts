import { computed, inject, Injectable, signal } from '@angular/core';
import { CustomAnswer, OpenAiResult, Pointsofinterest } from '../model/open-ai';
import { OpenAiMapService } from './open-ai.service';

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private openAiMapService = inject(OpenAiMapService)
  pending = signal(false)
  openAiResponse = signal<OpenAiResult | null>(null)

  readonly selectedPoi = signal<Pointsofinterest | null>(null)

  changeSelectedPoi(poi: Pointsofinterest) {
    this.selectedPoi.set(poi)
  }

  loadPoi(city: string, description = '') {
    console.log(city, description);
    this.pending.set(true)
    // NEW: also reset selectedPoi after every new search
    this.selectedPoi.set(null)

    this.openAiMapService.getPointsOfInterests(city, description)
      .subscribe({
        next: res => {
          console.log(res)
          this.openAiResponse.set(res)
          this.pending.set(false)
        },
        error: res => {
          this.pending.set(false)
        }
      })
  }

  content = computed(() => {
    const res = this.openAiResponse();
    if (res) {
      return JSON.parse(res.choices[0].message.content ) as CustomAnswer
    }
    return null;
  })

  pois = computed(() => {
    return this.content()?.points_of_interest || []
  })

  poisAreAvailable = computed(() => {
    return !!this.content()?.points_of_interest.length
  })
  centerPosition = computed(() => {
    // If a Point of Interest (PoI) is selected (from the list)
    if(this.selectedPoi())
      // the center is the selected PoI coordinates
      return { lat: this.selectedPoi()?.coordinates.latitude , lng: this.selectedPoi()?.coordinates.longitude} as google.maps.LatLngLiteral
    else
      // otherwise is the main location coordinate (i.e. Milan)
      return { lat: this.content()?.coordinates.latitude , lng: this.content()?.coordinates.longitude} as google.maps.LatLngLiteral
  })
}
