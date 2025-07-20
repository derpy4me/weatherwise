import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface LocationResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-search-results',
  imports: [CommonModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults {
  @Input() results: LocationResult[] = [];
  @Output() locationSelected = new EventEmitter<LocationResult>();

  onSelect(location: LocationResult) {
    this.locationSelected.emit(location);
  }
}
