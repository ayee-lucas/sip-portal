import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStatusService } from '../services/auth-status.service';

export const canActivateDashboard: CanActivateFn = () => {
  return inject(AuthStatusService).authStatus();
};

export const canActivateLogin: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn$ = inject(AuthStatusService).authStatus();

  let isLoggedIn = false;

  isLoggedIn$
    .subscribe(res => {
      isLoggedIn = res;
    })
    .unsubscribe();

  if (isLoggedIn) {
    router.navigate(['']);
  }

  return true;
};
