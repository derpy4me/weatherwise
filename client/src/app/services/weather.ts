import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString());

    return this.http.get(`${this.apiUrl}/weather`, { params });
  }

  getGeocode(cityName: string): Observable<any> {
    const params = new HttpParams().set('city', cityName);
    return this.http.get(`${this.apiUrl}/geocode`, { params });
  }
}
