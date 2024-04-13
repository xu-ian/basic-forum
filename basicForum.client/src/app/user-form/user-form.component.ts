import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { api } from '../api';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  UserForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  public app: api;

  public error: boolean = false;
  public errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.app = new api(http);
  }

  sendCredentials(e: Event) {
    e.preventDefault();
    if (this.type == 'login') {
      this.app.login(this.UserForm.value.username!, this.UserForm.value.password!, (result) => {
        console.log(result);
        this.router.navigate(['/main']);
      }, (err) => {
        this.error = true;
        this.errorMessage = err.error;
        console.error(err);
      });
    } else if (this.type == 'signup') {
      this.app.signup(this.UserForm.value.username!, this.UserForm.value.password!, (result) => {
        console.log(result);
        this.router.navigate(['/login']);
      }, (err) => {
        this.error = true;
        this.errorMessage = err.error;
        console.error(err);
      });
    }
  }

  @Input({ required: true })type!: string;

}
