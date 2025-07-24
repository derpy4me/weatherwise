import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
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
    FormsModule,
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

  usernameInput: string = '';
  currentUser$: Observable<string | null>;

  constructor(
    private weatherService: WeatherService,
    private userService: UserService
  ) {
    this.currentUser$ = this.userService.username$;

    this.currentUser$.subscribe((name) => {
      if (name) {
        this.usernameInput = name;
      }
    });
  }

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
    if (!this.usernameInput) {
      return;
    }
    this.userService.getSavedLocations(this.usernameInput).subscribe();
  }

  handleSelectLocation(location: SavedLocation) {
    this.handleLocationConfirmed(location as LocationResult);
  }

  handleSaveLocation() {
    const cityId = this.weatherData.current.id;
    if (!cityId) return;
    this.userService.saveLocation(cityId).subscribe();
  }

  handleDeleteLocation(cityId: number) {
    this.userService.deleteLocation(cityId).subscribe();
  }

  handleSetUsername() {
    this.userService.setUsername(this.usernameInput.trim());
  }

  changeUser() {
    this.userService.setUsername('');
    this.usernameInput = '';
  }
}
