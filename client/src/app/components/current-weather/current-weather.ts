import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  imports: [DecimalPipe, CommonModule],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.css',
})
export class CurrentWeather {
  @Input() currentWeather: any;
}
