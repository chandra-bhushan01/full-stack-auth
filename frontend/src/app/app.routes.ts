import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: 'login', component: LoginPage},
  {path: 'register', component: RegisterPage}
];