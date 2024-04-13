import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder} from '@angular/forms';
import { api } from '../../api';

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrl: './post-message.component.css'
})
export class PostMessageComponent {

  PostMessageForm = this.formBuilder.group({
    message: ['', Validators.required],
  });

  public app: api;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.app = new api(http);
  }

  postMessage(e: Event) {
    e.preventDefault();
    this.app.postMessage(this.app.getCookie('user')!, this.PostMessageForm.value.message!, this.forum, (result) => {
      this.PostMessageForm.reset();
    });
  }

  @Input() forum!: string;

}
