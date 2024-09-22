import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private scope = 'user-library-read';

    constructor(private http: HttpClient, private router: Router) { }
    
    private generateRandomString(length: number): string {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = window.crypto.getRandomValues(new Uint8Array(length));
        return Array.from(values).map(x => possible[x % possible.length]).join('');
      }
    
      private async sha256(plain: string): Promise<ArrayBuffer> {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
      }
    
      private base64encode(input: ArrayBuffer): string {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
      }
    
      async initiateLogin(): Promise<void> {
        const codeVerifier = this.generateRandomString(64);
        const codeChallenge = await this.generateCodeChallenge(codeVerifier);
        // Store the code verifier in local storage
        window.localStorage.setItem('code_verifier', codeVerifier);
        
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        const params = {
          response_type: 'code',
          client_id: environment.clientId,
          scope: this.scope,
          code_challenge_method: 'S256',
          code_challenge: codeChallenge,
          redirect_uri: environment.redirectUrl
        };
    
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
      }
    
      private async generateCodeChallenge(verifier: string): Promise<string> {
        const hashed = await this.sha256(verifier);
        return this.base64encode(hashed);
      }
    
      
    authenticate(credentials: { username: string; password: string }): Observable<any> {
        const params = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
        return this.http.get(`${environment.apiUrl}/login`, {params});
    }
    
}