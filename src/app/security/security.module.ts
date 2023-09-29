import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { canActivateLogin } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    outlet: 'security',
    canActivate: [canActivateLogin]
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
  bootstrap: [LoginComponent]
})
export class SecurityModule {}
