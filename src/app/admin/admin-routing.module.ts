import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { FirstGlanceComponent } from './components/first-glance/first-glance.component';

const routes: Routes = [
  { path: '', component: FirstGlanceComponent },
  {
    path: environment.ROUTE.audit,
    loadChildren: () => import('../audit/audit.module').then(m => m.AuditModule)
  },
  {
    path: environment.ROUTE.operation,
    loadChildren: () =>
      import('../operation/operation.module').then(m => m.OperationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
