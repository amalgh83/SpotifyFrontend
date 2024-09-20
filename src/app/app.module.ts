import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // Add other components as needed
import { HomeComponent } from './home/home.component'; // Example component

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent // Declare your components here
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([ // Add your routes here
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomeComponent },
            { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
