import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-callback',
  template: `<p>Loading...</p>`,
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.handleCallback();
  }

  private async handleCallback(): Promise<void> {
    const code = this.route.snapshot.queryParamMap.get('code');
    const codeVerifier = window.localStorage.getItem('code_verifier');

    if (code && codeVerifier) {
     
      const response = await fetch(`${environment.apiUrl}/api/auth/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          code_verifier: codeVerifier,
        }),
      });

      if (response.ok) {
        const stringData = await response.json(); // Get the response as a string

    try {
        const data = JSON.parse(stringData); // Parse the string to JSON
        
       window.localStorage.setItem('access_token', data.access_token);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
    }

        // Redirect to home page
        this.router.navigate(['/home']);
      } else {
        console.error('Error exchanging code for token:', response.statusText);
      }
    } else {
      console.error('No code or codeVerifier found');
    }
  }
}
