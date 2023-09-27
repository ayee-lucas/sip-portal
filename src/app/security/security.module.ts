import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: environment.ROUTE.login,
    pathMatch: 'full'
  },
  { path: environment.ROUTE.login, component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule]
})
export class SecurityModule {}
