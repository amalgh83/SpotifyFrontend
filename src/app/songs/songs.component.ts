import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { Song } from '../models/songs';
import { Image } from '../models/image';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { GridComponent } from '../grid/grid.component';




@Component({
  selector: 'app-songs',
  standalone: true,
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  imports: [CommonModule, FormsModule, CardComponent, GridComponent] 
})

export class SongsComponent implements OnInit {
  albumId: string | null = null;
  images: Image[] = [];
  songs: Song[] = []; 
 
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private AlbumService : AlbumService, private router: Router) { }

  ngOnInit(): void {
    this.albumId = this.route.snapshot.paramMap.get('id');
    this.images = this.AlbumService.getSelectedImages(); 
    if (this.albumId) {
      // Fetch songs for the album
      this.AlbumService.fetchSongssByAlbumId(this.albumId).subscribe(
        
        (songs: Song[]) => {
          this.songs = songs.map(song => ({
            ...song,
            images : this.images,
            type: 'songs'
          }));
        },
        (error) => {
          console.error('Error fetching tracks:', error);
        }
      );
    }
  }

}

