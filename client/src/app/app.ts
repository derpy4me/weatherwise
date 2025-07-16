import { CommonModule, DecimalPipe, JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { Search } from './components/search/search';
import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, DecimalPipe, Search, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('weatherwise-client');
  weatherData: any;
  locationData: any;
  error: any;
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.fetchTestData();
  }

  fetchTestData() {
    const newYorkLat = 40.7128;
    const newYorkLon = -74.006;

    this.weatherService.getWeather(newYorkLat, newYorkLon).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  handleCitySearch(cityName: string) {
    this.weatherData = null;
    this.locationData = null;
    this.error = null;
    this.isLoading = true;

    this.weatherService
      .getGeocode(cityName)
      .pipe(
        switchMap((location) => {
          this.locationData = location;
          return this.weatherService.getWeather(location.lat, location.lon);
        })
      )
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error;
          this.isLoading = false;
        },
      });
  }
}
