import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authServices = inject(AuthService);
  const router = inject(Router);

  if(authServices.isLogging()){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
