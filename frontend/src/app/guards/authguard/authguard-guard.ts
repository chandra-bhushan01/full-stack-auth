import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("authToken")
  const router = inject(Router)

  if (token) {
    router.navigate(['/home']);
    return false;
  } 
  return true;
  

};
