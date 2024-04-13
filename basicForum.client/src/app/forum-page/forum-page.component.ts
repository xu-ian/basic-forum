import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { api } from '../api';
import { ForumGeneratorComponent } from './forum-generator/forum-generator.component';
import { Router } from '@angular/router';

interface Forum {
  name: string;
  description: string;
}

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrl: './forum-page.component.css'
})
export class ForumPageComponent implements OnInit{


  public api: api;
  public forums: Forum[] = [];
  constructor(private http: HttpClient, private router: Router) {
    this.api = new api(http);
  }

  ngOnInit() {
    this.api.getForums((next) => {
      this.forums = next;
      console.log(next);//Testing Only
    });
  }

  signedIn() {
    return this.api.getCookie("user") != ""; 
  }

  navigateForum(name: string) {
    this.router.navigate(["/forum/" + name.toString()]);
  }

}
