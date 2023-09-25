import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationComponent } from './components/operation.component';
import { RouterModule, Routes } from '@angular/router';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [{ path: '', component: OperationComponent }];

@NgModule({
  declarations: [OperationComponent, UserSelectorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  bootstrap: [OperationComponent]
})
export class OperationModule {}
