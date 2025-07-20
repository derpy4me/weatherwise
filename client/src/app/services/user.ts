import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {}

  getSavedLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/locations`);
  }

  saveLocation(cityId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/locations`, { cityId });
  }

  deleteLocation(cityId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/locations/${cityId}`);
  }
}
