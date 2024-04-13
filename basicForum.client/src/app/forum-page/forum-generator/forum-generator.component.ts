import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { api } from '../../api'

@Component({
  selector: 'app-forum-generator',
  templateUrl: './forum-generator.component.html',
  styleUrl: './forum-generator.component.css'
})
export class ForumGeneratorComponent {

  private api!: api;


  ForumGenerateForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['']
  });
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.api = new api(http);
  };

  createForum(e: Event) {
    e.preventDefault();
    this.api.postForum(this.ForumGenerateForm.value.name!, this.ForumGenerateForm.value.description!, (next) => {
      console.log(next);//Testing Only
      this.router.navigate(['/forum/' + this.ForumGenerateForm.value.name]);
    });
  }
}
