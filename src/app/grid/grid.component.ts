import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { HomeComponent } from '../home/home.component';
import { Album } from '../models/album';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnChanges {
  @Input() items: any[] = []; 
  //@Input() type: 'album' | 'songs' | undefined;

  @Output() modalOpen: EventEmitter<any> = new EventEmitter(); // For modal open
  @Output() viewSongs: EventEmitter<Album> = new EventEmitter(); // For navigating to songs

  pagedItems: any[] = [];
  filteredItems: any[] = [];
  searchedItems: any[] = [];
  searchTerm: string = '';
  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 1;


  ngOnChanges(changes: SimpleChanges) {
    
      this.filteredItems = this.items;
      this.updatePagination();
    
  }

  // Update the filtered items based on search input
  onSearch() {
    console
    if (!this.searchTerm) {
      this.filteredItems = this.items; // Reset to original items
      return;
    }
    const term = this.searchTerm.toLowerCase();
    
    this.searchedItems = this.filteredItems;
    this.filteredItems = this.searchedItems.filter(item => item.Name?.toLowerCase().includes(term));
    
  
    this.currentPage = 1; // Reset to the first page after search
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedItems = this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  openModal(images: any[]) {
    this.modalOpen.emit(images);
  }

  // Function to handle the "View Songs" button
  viewsongs(item: Album) {
    this.viewSongs.emit(item);
  }

}
