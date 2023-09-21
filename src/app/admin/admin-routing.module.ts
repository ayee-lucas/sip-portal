import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { AdminComponent } from './components/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'audit', pathMatch: 'full' },
  {
    path: environment.ROUTE.audit,
    loadChildren: () => import('../audit/audit.module').then(m => m.AuditModule)
  }
];

@NgModule({
  declarations: [AdminComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AdminComponent]
})
export class AdminRoutingModule {}
