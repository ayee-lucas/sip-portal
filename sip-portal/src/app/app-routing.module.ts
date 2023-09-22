import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryComponent } from './query/query.component';
import { AuditCardComponent } from './shared/audit-card/audit-card.component';
import { NavbarComponent } from "./navbar/navbar.component";

const routes: Routes = [
  {path: '', redirectTo: 'query', pathMatch: 'full'},
  { path: 'Navb', component: NavbarComponent},
  { path: 'query', component: QueryComponent }, 
  { path: 'audit', component: AuditCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
