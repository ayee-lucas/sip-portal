import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {}
