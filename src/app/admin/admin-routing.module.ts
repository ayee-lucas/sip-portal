import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { FirstGlanceComponent } from './components/first-glance/first-glance.component';
import { canActivateDashboard } from '../security/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: FirstGlanceComponent,
    canActivate: [canActivateDashboard]
  },
  {
    path: environment.ROUTE.audit,
    loadChildren: () =>
      import('../audit/audit.module').then(m => m.AuditModule),
    canActivate: [canActivateDashboard]
  },
  {
    path: environment.ROUTE.users,
    loadChildren: () =>
      import('../users/users.module').then(m => m.UsersModule),

    canActivate: [canActivateDashboard]
  },
  {
    path: environment.ROUTE.security,
    loadChildren: () =>
      import('../security/security.module').then(m => m.SecurityModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
