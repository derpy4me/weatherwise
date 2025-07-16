import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('weatherwise-client');
  weatherData: any;
  error: any;

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
}
