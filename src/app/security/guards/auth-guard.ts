import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStatusService } from '../services/auth-status.service';

export const canActivateDashboard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn$ = inject(AuthStatusService).authStatus();

  isLoggedIn$
    .subscribe(res => {
      if (!res) {
        router.navigate(['/auth']);
      }
    })
    .unsubscribe();

  return true;
};

export const canActivateLogin: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn$ = inject(AuthStatusService).authStatus();

  isLoggedIn$
    .subscribe(res => {
      if (res) {
        router.navigate(['']);
      }
    })
    .unsubscribe();

  return true;
};
