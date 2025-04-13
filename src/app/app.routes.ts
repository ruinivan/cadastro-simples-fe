import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ShowComponent } from './show/show.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'new-user',
    component: NewUserComponent,
  },
  {
    path: 'show-users',
    component: ShowComponent,
  },
];
