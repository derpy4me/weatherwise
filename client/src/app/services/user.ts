import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { SavedLocation } from '../components/saved-locations/saved-locations';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userNameKey = 'weatherwise_username';
  private readonly apiUrl = 'http://localhost:3000/api/user';
  private username = new BehaviorSubject<string | null>(null);
  public username$ = this.username.asObservable();

  private savedLocations = new BehaviorSubject<SavedLocation[] | null>(null);
  public savedLocations$ = this.savedLocations.asObservable();

  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem(this.userNameKey);
    if (storedUsername) {
      this.setUsername(storedUsername);
    }
  }

  getSavedLocations(username: string): Observable<SavedLocation[]> {
    return this.http
      .get<SavedLocation[]>(
        `${this.apiUrl}/${this.username.getValue()}/locations`
      )
      .pipe(
        tap((locations) => {
          catchError((err) => {
            console.error(err);
            return throwError(() => err);
          });
          this.savedLocations.next(locations);
        }),
        catchError(() => {
          this.savedLocations.next(null);
          return of([]);
        })
      );
  }

  saveLocation(cityId: number): Observable<any> {
    const username = this.username.getValue();
    if (!username) {
      return of(null);
    }
    return this.http
      .post<SavedLocation[]>(`${this.apiUrl}/${username}/locations`, { cityId })
      .pipe(
        tap((updatedLocations) => {
          console.log(
            '[UserService:saveLocation] Received from server:',
            updatedLocations
          );
          this.savedLocations.next(updatedLocations);
          console.log(
            '[UserService:saveLocation] BehaviorSubject value is now:',
            this.savedLocations.getValue()
          );
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  deleteLocation(cityId: number): Observable<any> {
    const username = this.username.getValue();
    if (!username) {
      return of(null);
    }
    return this.http
      .delete<SavedLocation[]>(`${this.apiUrl}/${username}/locations/${cityId}`)
      .pipe(
        tap((updatedLocations) => {
          console.log(
            '[UserService:deleteLocation] Received from server:',
            updatedLocations
          );
          this.savedLocations.next(updatedLocations);
          console.log(
            '[UserService:deleteLocation] BehaviorSubject value is now:',
            this.savedLocations.getValue()
          );
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  setUsername(username: string) {
    if (!username || !username.trim()) {
      this.username.next(null);
      this.savedLocations.next(null);
      localStorage.removeItem(this.userNameKey);
      return;
    }
    this.username.next(username);
    localStorage.setItem(this.userNameKey, username);
    this.getSavedLocations(username).subscribe();
  }
}
