import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5000/api/auth'; // Adjust as necessary

    constructor(private http: HttpClient, private router: Router) { }

    login() {
        // Redirect to Spotify OAuth flow
        window.location.href = `${this.apiUrl}/login`;
    }

    handleCallback(code: string) {
        this.http.get(`${this.apiUrl}/callback?code=${code}`).subscribe(response => {
            //localStorage.setItem('access_token', response.access_token);
            this.router.navigate(['/home']);
        }, error => {
            console.error('Error fetching token:', error);
        });
    }
}