import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login() {
      // Here you would typically authenticate the user with your own backend
      // For Spotify, we redirect to their OAuth flow
      this.authService.login();
  }
}