import { HttpClient } from '@angular/common/http';

const SERVER = 'https://127.0.0.1:7170';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Post {
  username: string;
  message: string;
  upvotes: string;
  downvotes: string;
}

interface Forum {
  name: string;
  description: string;
}
export class api {
  constructor(private http: HttpClient) { };

  //Get Forecasts default endpoint
  public getForecasts(next: (value: any) => void) {
    return this.http.get<WeatherForecast[]>(SERVER + '/GetWeatherForecast').subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Sign Up user endpoint
  public signup(user: string, password: string, next: (value: any) => void, error: (value: any) => void) {
    let post = { username: user, password: password };
    let headers = { 'Content-Type': 'application/json' };
    return this.http.post(SERVER + '/Users/Signup', post, { headers }).subscribe({
      next: next,
      error: error
    });
  }

  //Log In user endpoint
  public login(user: string, password: string, next: (value: any) => void, error: (value: any) => void) {
    let post = { username: user, password: password };
    let headers = { 'Content-Type': 'application/json'};
    return this.http.post(SERVER + '/Users/Login', post, { withCredentials: true, headers: headers }).subscribe({
      next: next,
      error: error
    });
  }

  //Log Out user endpoint
  public logout(next: (value: any) => void) {
    return this.http.post(SERVER + '/Users/Logout', "" , { withCredentials: true }).subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Get Forums endpoint
  public getForums(next: (value: any) => void) {
    return this.http.get<Forum[]>(SERVER + '/Forums').subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Post Forum endpoint
  public postForum(name: string, description: string, next: (value: any) => void) {
    let post = { name: name, description: description};
    let headers = { 'Content-Type': 'application/json' };
    this.http.post(SERVER + '/Forums', post, { headers }).subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Delete Forum endpoint
  public deleteForum(name: string, next: (value: any) => void) {
    this.http.delete(SERVER + '/Forums/' + name).subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Get Posts endpoint
  public getPosts(name: string, limit: number, next: (value: any) => void) {
    return this.http.get<Post[]>(SERVER + "/Messages?name="+name+"&limit="+String(limit)).subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Create a post endpoint
  public postMessage(user: string, message: string, forum: string, next: (value: any) => void) {
    let post = { username: user, message: message, forumName: forum};
    let headers = { 'Content-Type': 'application/json' };
    this.http.post(SERVER + '/Messages', post, { headers }).subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Downvote a post endpoint
  public downvoteMessage(id: number, next: (value: any) => void) {
    let headers = { 'Content-Type': 'application/json' };
    this.http.patch(SERVER + "/Messages/" + id, "\"downvote\"", { headers }).subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Upvote a post endpoint
  public upvoteMessage(id: number, next: (value: any) => void) {
    let headers = { 'Content-Type': 'application/json' };
    this.http.patch(SERVER + "/Messages/" + id, "\"upvote\"", {headers}).subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Delete a post endpoint
  public deleteMessage(id: number, next: (value: any) => void) {
    this.http.delete(SERVER + "/Messages/" + id).subscribe({
      next: next,
      error: (error) => { console.log(error); }
    });
  }

  //Retrieves the value of a cookie given the name
  getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2) {
      return parts.pop()!.split(";").shift();
    } else {
      return "";
    }
  }
}
