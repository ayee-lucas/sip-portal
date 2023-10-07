import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { RouterModule, Routes } from '@angular/router';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginatorUsersComponent } from './components/paginator/paginator-users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchUsersSelectorComponent } from './components/search-users-selector/search-users-selector.component';
import { SearchUserDialogComponent } from './components/search-user-dialog/search-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserOperationsComponent } from './components/user-operations/user-operations.component';
import { UserActionsComponent } from './components/user-actions/user-actions.component';
import { ToastModule } from 'primeng/toast';
import { NewUserComponent } from './components/new-user/new-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    UserSelectorComponent,
    PaginatorUsersComponent,
    SearchUsersSelectorComponent,
    SearchUserDialogComponent,
    UserOperationsComponent,
    UserActionsComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    ToastModule
  ],
  bootstrap: [UsersComponent]
})
export class UsersModule {}
