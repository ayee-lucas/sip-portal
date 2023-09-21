import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuditCardComponent } from './audit-card/audit-card.component';

const routes: Routes = [
  { path: 'audit', component: AuditCardComponent }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
