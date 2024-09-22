import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../services/album.service';
import { Image } from '../models/image';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() images: Image[] = [];  // Input for the album's images
  selectedImageUrl: string | null = null;
  smallestImage: Image | null =null;

  constructor(private AlbumService: AlbumService) {}

  ngOnInit(): void {
    this.smallestImage = this.AlbumService.getSelectedImage(64, this.images); 

  }

  getLargestImage(): Image | null {
    if (this.images.length === 0) return null;
    return this.images.reduce((prev, current) => (prev.width > current.width ? prev : current));
  }

  openModal(): void {
    const largestImage = this.getLargestImage();
    if (largestImage) {
      this.selectedImageUrl = largestImage.url;
    }
  }

  closeModal(): void {
    this.selectedImageUrl = null;  // Close the modal
  }
}
