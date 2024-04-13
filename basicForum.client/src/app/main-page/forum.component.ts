import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { api } from '../api';
import { PostMessageComponent } from './post-message/post-message.component'
import { Location } from '@angular/common';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Post {
  id: number;
  username: string;
  message: string;
  upvotes: string;
  downvotes: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  public messages: Post[] = [];
  public app: api;
  public forum: string = "";
  constructor(private http: HttpClient, private location: Location) {
    this.app = new api(http);
    this.forum = this.location.path().split("/")[2];
  }

  ngOnInit() {
    this.getForecasts();
    this.getPosts();
  }

  getForecasts() {
    this.app.getForecasts((result) => {
      this.forecasts = result;
    });
  }

  getPosts() {
    console.log(this.forum);
    this.app.getPosts(this.forum, 100, (result) => {
      this.messages = result;
    });
  }

  downvoteMessage(id: number) {
    this.app.downvoteMessage(id, (result) => {
      this.getPosts();
      console.log(result);
    });
  }

  upvoteMessage(id: number) {
    this.app.upvoteMessage(id, (result) => {
      this.getPosts();
      console.log(result);
    });
  }

  deleteMessage(id: number) {
    this.app.deleteMessage(id, (result) => {
      this.getPosts();
      console.log(result);
    });
  }

  signedIn() {
    return this.app.getCookie("user") != "";
  }

  sameUser(name: string) {
    return this.app.getCookie("user") == name;
  }

  title = 'forum.client';
}
