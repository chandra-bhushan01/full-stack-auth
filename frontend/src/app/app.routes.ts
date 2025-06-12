import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { LoginPage } from './pages/login-page/login-page';
import { Update } from './pages/update/update';
import { authguardGuard } from './guards/authguard/authguard-guard';



export const routes: Routes = [
  
  {path: 'login', component: LoginPage},
  {path:'update',component: Update,canActivate: [authguardGuard] },
  { path: '', component: HomeComponent, canActivate: [authguardGuard] }
];