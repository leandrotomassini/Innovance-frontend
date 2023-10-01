import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const isInstructorGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const result = await firstValueFrom(authService.checkAuthStatus());

    if (result) {
      const isActive = authService.currentUser.isActive;
      const isInstructor = authService.currentUser.roles.includes('instructor');
      if (isActive && isInstructor) {
        return true;
      } else {
        authService.logout();
        router.navigate(['/auth/login']);
        return false;
      }
    } else {
      authService.logout();
      router.navigate(['/auth/login']);
      return false;
    }
  } catch (error) {
    authService.logout();
    router.navigate(['/auth/login']);
    return false;
  }
};
