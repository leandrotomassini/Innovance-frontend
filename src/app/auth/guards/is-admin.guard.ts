import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAdminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const user = computed(() => authService.currentUser());

  console.log(user())

  return true;
};
