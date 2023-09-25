import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationComponent } from './components/operation.component';
import { RouterModule, Routes } from '@angular/router';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: OperationComponent }];

@NgModule({
  declarations: [OperationComponent, UserSelectorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatIconModule],
  bootstrap: [OperationComponent]
})
export class OperationModule {}
