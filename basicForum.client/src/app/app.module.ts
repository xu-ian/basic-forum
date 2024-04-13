import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { routes } from './app-routing.module';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { ForumComponent } from './main-page/forum.component'
import { PostMessageComponent } from './main-page/post-message/post-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login-page/login.component';
import { SignupComponent } from './signup-page/signup.component';
import { NotfoundComponent } from './notfound-page/notfound.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { ForumGeneratorComponent } from './forum-page/forum-generator/forum-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    PostMessageComponent,
    ForumComponent,
    LoginComponent,
    SignupComponent,
    NotfoundComponent,
    UserFormComponent,
    ForumPageComponent,
    ForumGeneratorComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterOutlet
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
