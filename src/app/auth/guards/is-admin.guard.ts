import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const isAdminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isActive: boolean = false;
  let isAdmin: boolean = false;

  try {
    await new Promise<boolean>((resolve) => {
      authService.checkAuthStatus().subscribe({
        next: (result) => {
          isActive = authService.currentUser.isActive;
          isAdmin = authService.currentUser.roles.includes('admin'); // Verificar si el usuario tiene el rol de admin
          resolve(result);
        },
        error: (error) => {
          if (error.status === 401) {
            authService.logout();
            router.navigate(['/auth/login']);
          }
        }
      });
    });
  } catch (error) {
    authService.logout();
    router.navigate(['/auth/login']);
    return false;
  }

  if (!isActive || !isAdmin) { // Verificar si isActive es false o isAdmin es false
    authService.logout();
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

