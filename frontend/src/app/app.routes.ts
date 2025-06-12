import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { LoginPage } from './pages/login-page/login-page';
import { Update } from './pages/update/update';


export const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: 'login', component: LoginPage},
  {path: 'update', component: Update }
];