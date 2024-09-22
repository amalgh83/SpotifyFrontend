import { Image } from './image'

export interface Artist {
    name: string; 
}

export interface Album {
    Id: string; 
    Name: string; 
    artistName: string[]; 
    images: Image[]; 
    selectedImage?: Image | null;
}