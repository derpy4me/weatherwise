import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user';

export interface SavedLocation {
  cityId: number;
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-saved-locations',
  imports: [CommonModule, FormsModule],
  templateUrl: './saved-locations.html',
  styleUrl: './saved-locations.css',
})
export class SavedLocationsComponent {
  @Input() locations: SavedLocation[] = [];
  @Output() locationSelected = new EventEmitter<SavedLocation>();
  @Output() locationDeleted = new EventEmitter<number>();

  savedLocations$: Observable<SavedLocation[] | null>;
  hasUser$: Observable<string | null>;

  constructor(private userService: UserService) {
    this.hasUser$ = this.userService.username$;
    this.savedLocations$ = this.userService.username$.pipe(
      switchMap((username) => {
        if (!username) {
          return of([]);
        }
        return this.userService.getSavedLocations(username);
      })
    );
  }

  onSelect(location: SavedLocation) {
    this.locationSelected.emit(location);
  }

  onDelete(event: MouseEvent, cityId: number) {
    event.stopPropagation();
    this.locationDeleted.emit(cityId);
  }
}
