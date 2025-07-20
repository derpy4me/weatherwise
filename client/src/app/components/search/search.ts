import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather';
import { LocationResult, SearchResults } from './search-results/search-results';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, SearchResults],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchQuery: string = '';
  searchResults: LocationResult[] = [];
  error: string | null = null;
  isLoading: boolean = false;

  @Output() locationConfirmed = new EventEmitter<LocationResult>();

  constructor(private weatherService: WeatherService) {}

  onSearch() {
    if (!this.searchQuery && !this.searchQuery.trim()) return;

    this.isLoading = true;
    this.searchResults = [];
    this.error = null;

    this.locationConfirmed.emit(undefined);
    this.weatherService.getGeocode(this.searchQuery.trim()).subscribe({
      next: (results) => {
        this.isLoading = false;
        if (results.length === 0) {
          this.error = 'No Locations found for that search';
        } else if (results.length === 1) {
          this.onLocationSelected(results[0]);
        } else {
          this.searchResults = results;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Could not perform search.';
        console.error('Error in geocoding', err);
      },
    });
  }

  onLocationSelected(location: LocationResult) {
    this.searchResults = [];
    this.searchQuery = '';
    this.error = null;
    this.locationConfirmed.emit(location);
  }
}
