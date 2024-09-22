import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { SongsComponent } from './songs/songs.component';
import { CardComponent } from './card/card.component';
import { GridComponent } from './grid/grid.component';

export const routes: Routes = [
  // Add your routes here
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'songs/:id', component: SongsComponent },
  { path: 'card', component: CardComponent },
  { path: 'grid', component: GridComponent }
];
