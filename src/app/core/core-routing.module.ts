import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { canActivateDashboard } from '../security/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../admin/admin.module').then(m => m.AdminModule),
    canActivate: [canActivateDashboard]
  },
  {
    path: environment.ROUTE.security,
    loadChildren: () =>
      import('../security/security.module').then(m => m.SecurityModule)
  },
  {
    path: environment.ROUTE.audit,
    loadChildren: () =>
      import('../query/query.module').then(m => m.QueryModule),
    canActivate: [canActivateDashboard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
