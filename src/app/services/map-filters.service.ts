import { Injectable, signal } from '@angular/core';

const initialState = {
  bike: false,
  traffic: false,
  transit: false
}

export type MapFilters = typeof initialState
export type MapFilterKey = keyof MapFilters

@Injectable({ providedIn: 'root' })
export class MapFiltersService {
  filters = signal(initialState)

  updateFilter(key: MapFilterKey, enabled: boolean ) {
    this.filters.update(filters => {
      return { ...filters, [key]: enabled}
    })
  }
}