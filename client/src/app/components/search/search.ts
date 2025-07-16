import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchQuery: string = '';

  @Output() citySearched = new EventEmitter<string>();

  onSearch() {
    if (this.searchQuery && this.searchQuery.trim()) {
      this.citySearched.emit(this.searchQuery.trim());
      this.searchQuery = '';
    }
  }
}
