import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  imports: [CommonModule],
  templateUrl: './saved-locations.html',
  styleUrl: './saved-locations.css',
})
export class SavedLocationsComponent {
  @Input() locations: SavedLocation[] = [];
  @Output() locationSelected = new EventEmitter<SavedLocation>();
  @Output() locationDeleted = new EventEmitter<number>();

  onSelect(location: SavedLocation) {
    this.locationSelected.emit(location);
  }

  onDelete(event: MouseEvent, cityId: number) {
    event.stopPropagation();
    this.locationDeleted.emit(cityId);
  }
}
