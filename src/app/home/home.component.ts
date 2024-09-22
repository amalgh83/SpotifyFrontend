import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album'; 
import { Image } from '../models/image'; 
import { CommonModule } from '@angular/common'; // Needed for ngIf
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { GridComponent } from '../grid/grid.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, FormsModule, CardComponent, GridComponent] 
})
export class HomeComponent implements OnInit {
    albums: Album[] = [];
    //searchTerm: string = '';

    //selectedImage: Image | null = null;
    constructor(private AlbumService: AlbumService, private router: Router) {}

    ngOnInit() {
        //to retrieve all user albums
        this.AlbumService.fetchAlbums().subscribe(
            (data: Album[]) => {
              this.albums = data.map(album => ({
                ...album,
                type: 'album'
            }));
            },
            (error: any) => {
              console.error('Error fetching albums:', error);
            }
          );
    }



    viewSongs(album: Album) {
        this.AlbumService.setSelectedImages(album.images);
        this.router.navigate(['/songs', album.Id]);
      }
}
