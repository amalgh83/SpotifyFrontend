import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Image } from '../models/image';
import { Song } from '../models/songs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {

    selectedImageUrl: string | null = null;
    private selectedImage: Image | null = null;

    private selectedImages: Image[] = [];

    constructor(private http: HttpClient, private router: Router) { }
    

    fetchAlbums(): Observable<any>  {
        const accessToken = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`
        });

        return this.http.get<Album[]>(`${environment.apiUrl}/api/music/albums`, { headers });
    }
    
    fetchSongssByAlbumId(Id:string): Observable<any>  {
        const accessToken = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`
        });

        return this.http.get<Song>(`${environment.apiUrl}/api/music/album/${Id}/songs`, { headers });
    }

    //selects specific image according to width
    getSelectedImage(width: number, images: Image[]): Image |  null {
         const image = images.find(x => x.width  === width);
         return image ? image : null;
    }

    //sets the selected album images
    setSelectedImages(images: Image[]): void {
        this.selectedImages = images;
    }

  //gets the selected album images
    getSelectedImages(): Image[] {
        return this.selectedImages;
    }

    //sets the selected image
    onImageClick(image: Image): void {
        this.selectedImage = image;
      }
    
      //retrieves the images of selected album
      getselectedImage(): Image | null {
        return this.selectedImage;  
      }

      clearSelectedImage(): void {
        this.selectedImage = null;
      }
}