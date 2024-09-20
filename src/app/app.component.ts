import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Spotify App';
    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        const code = this.getQueryParameter('code');
        if (code) {
            this.authService.handleCallback(code);
        }
    }

    private getQueryParameter(name: string): string | null {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
}