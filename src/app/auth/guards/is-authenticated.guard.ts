import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';


export const isAuthenticatedGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  let isActive: boolean = false;

  try {
    await new Promise<boolean>((resolve) => {
      authService.checkAuthStatus().subscribe((result) => {
        isActive = authService.currentUser.isActive;
        resolve(result);
      });
    });
  } catch (error) {
    console.log(error);
  }


  return isActive;
};
