import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { api } from './api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  public signedIn: boolean = false;

  private api: api;

  constructor(private router: Router, private http: HttpClient) {
    this.api = new api(http);
    this.signedIn = this.api.getCookie("user") != "";
    this.router.events.subscribe((event) => {
      this.signedIn = this.api.getCookie("user") != "";
    });
  };



  login() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  logout() {
    this.api.logout((next) => {
      this.router.navigate(['/']);
      console.log(next);
    });
  }

  home() {
    this.router.navigate(['/']);
  }

  title = 'basicForum.client';
}
