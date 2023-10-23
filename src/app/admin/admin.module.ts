import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstGlanceComponent } from './components/first-glance/first-glance.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchUsersSelectorComponent } from './components/users/search-users-selector/search-users-selector.component';
import { UserSelectorComponent } from './components/users/user-selector/user-selector.component';
import { PaginatorUsersComponent } from './components/users/paginator/paginator-users.component';
import { UserNewComponent } from './components/users/user-new/user-new.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchUserDialogComponent } from './components/users/search-user-dialog/search-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserWrapperComponent } from './components/users/user-wrapper/user-wrapper.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProfileSelectorComponent } from './components/profiles/profile-selector/profile-selector.component';
import { SearchProfileComponent } from './components/profiles/search-profile/search-profile.component';
import { PaginatorProfilesComponent } from './components/profiles/paginator-profiles/paginator-profiles.component';
import { SearchProfileDialogComponent } from './components/profiles/search-profile-dialog/search-profile-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProfileUpdateComponent } from './components/profiles/profile-update/profile-update.component';
import { ProfileWrapperComponent } from './components/profiles/profile-wrapper/profile-wrapper.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProfileNewComponent } from './components/profiles/profile-new/profile-new.component';
import { ProfileDeleteDialogComponent } from './components/profiles/profile-delete-dialog/profile-delete-dialog.component';
import { ParkingComponent } from './components/parking/parking.component';

export const httpTranslateLoader = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, environment.refTranslate, '.json');

const routes: Routes = [
  {
    path: '',
    component: FirstGlanceComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'profiles',
    component: ProfilesComponent
  }
];

@NgModule({
  declarations: [
    FirstGlanceComponent,
    UsersComponent,
    SearchUserDialogComponent,
    SearchUsersSelectorComponent,
    PaginatorUsersComponent,
    UserNewComponent,
    UserSelectorComponent,
    UserUpdateComponent,
    UserWrapperComponent,
    ProfilesComponent,
    ProfileSelectorComponent,
    SearchProfileComponent,
    PaginatorProfilesComponent,
    SearchProfileDialogComponent,
    ProfileUpdateComponent,
    ProfileWrapperComponent,
    ProfileNewComponent,
    ProfileDeleteDialogComponent,
    ParkingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatIconModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule,
    MatSlideToggleModule
  ],
  bootstrap: [FirstGlanceComponent]
})
export class AdminModule {}
