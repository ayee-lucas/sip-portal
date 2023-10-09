import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditComponent } from './components/audit.component';
import { RouterModule, Routes } from '@angular/router';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { UsersSearchComponent } from './components/users-search/users-search.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const httpTranslateLoader = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, environment.refTranslate, '.json');

const routes: Routes = [{ path: '', component: AuditComponent }];

@NgModule({
  declarations: [AuditComponent, TableUsersComponent, UsersSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule]
})
export class AuditModule {}
