import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

  if (!token) {
    router.navigate(['/login']); // Avoid navigation error
    return false;
  }

  return true;
}
