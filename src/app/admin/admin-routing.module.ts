import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment.development';

const routes: Routes = [
  { path: '', redirectTo: environment.ROUTE.security, pathMatch: 'full' },
  {
    path: environment.ROUTE.audit,
    loadChildren: () => import('../audit/audit.module').then(m => m.AuditModule)
  },
  {
    path: environment.ROUTE.operation,
    loadChildren: () =>
      import('../operation/operation.module').then(m => m.OperationModule)
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
