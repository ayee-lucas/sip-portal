import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirstGlanceComponent } from './components/first-glance/first-glance.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent, FirstGlanceComponent],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {}
