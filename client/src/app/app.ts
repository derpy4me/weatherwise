import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentWeather } from './components/current-weather/current-weather';
import { Forecast } from './components/forecast/forecast';
import {
  SavedLocation,
  SavedLocationsComponent,
} from './components/saved-locations/saved-locations';
import { Search } from './components/search/search';
import { LocationResult } from './components/search/search-results/search-results';
import { UserService } from './services/user';
import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Search,
    CommonModule,
    CurrentWeather,
    Forecast,
    SavedLocationsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('weatherwise-client');
  weatherData: any;
  locationData: LocationResult | null = null;
  error: any;
  isLoading: boolean = false;
  savedLocations: SavedLocation[] = [];

  constructor(
    private weatherService: WeatherService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadSavedLocations();
  }

  handleLocationConfirmed(location: LocationResult | undefined) {
    if (!location) {
      this.weatherData = null;
      this.locationData = null;
      this.error = null;
      return;
    }

    this.weatherData = null;
    this.locationData = location;
    this.error = null;
    this.isLoading = true;

    this.weatherService
      .getWeather(location.lat, location.lon)
      .subscribe((data) => {
        this.weatherData = data;
        this.isLoading = false;
      });
  }

  loadSavedLocations() {
    this.userService.getSavedLocations().subscribe((locations) => {
      this.savedLocations = locations;
    });
  }

  handleSelectLocation(location: SavedLocation) {
    this.handleLocationConfirmed(location as LocationResult);
  }

  handleSaveLocation() {
    const cityId = this.weatherData.current.id;
    if (!cityId) return;
    this.userService.saveLocation(cityId).subscribe(() => {
      this.loadSavedLocations();
    });
  }

  handleDeleteLocation(cityId: number) {
    this.userService.deleteLocation(cityId).subscribe(() => {
      this.loadSavedLocations();
    });
  }
}
