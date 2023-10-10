import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { canActivateLogin } from './guards/auth-guard';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const httpTranslateLoader = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, environment.refTranslate, '.json');

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [canActivateLogin]
  },
  {
    path: 'recover',
    component: PasswordRecoveryComponent,
    canActivate: [canActivateLogin]
  }
];

@NgModule({
  declarations: [LoginComponent, PasswordRecoveryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule],
  bootstrap: [LoginComponent]
})
export class SecurityModule {}
