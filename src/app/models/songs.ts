import {Image} from './image'
export interface Song {
    Id: string; 
    Name: string; 
    uri: string; 
    images?: Image[];
}