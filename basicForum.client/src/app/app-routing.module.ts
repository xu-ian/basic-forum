import { Routes } from '@angular/router';
import { ForumComponent } from './main-page/forum.component';
import { LoginComponent } from './login-page/login.component';
import { SignupComponent } from './signup-page/signup.component';
import { NotfoundComponent } from './notfound-page/notfound.component';
import { ForumPageComponent } from './forum-page/forum-page.component';


export const routes: Routes = [
  {
    path: 'forum',
    children: [{ path: '**', component: ForumComponent}]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'main', component: ForumPageComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent}
];
