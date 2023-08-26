import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Obtener el token del local storage

  if (token) {
    router.navigate(['/clases']); // Redireccionar a /dashboard si hay un token
    return false;
  } else {
    return true; // Permitir la navegación si no hay un token
  }
};
