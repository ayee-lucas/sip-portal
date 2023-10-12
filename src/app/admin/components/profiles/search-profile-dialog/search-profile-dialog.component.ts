import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QueryService } from '../../../../query/services/query.service';
import {
  ResponseError,
  ResponseLoading
} from '../../../types/response-type-users';
import { Observable } from 'rxjs';
import { Profile } from '../../../types/response-type-profiles';
import { ProfileSelectorSearchService } from '../../../services/profile-selector-search.service';
import {
  _isProfile,
  _isProfileResponseError
} from '../../../../shared/utils/TypeGuards';

@Component({
  selector: 'app-search-profile-dialog',
  templateUrl: './search-profile-dialog.component.html'
})
export class SearchProfileDialogComponent implements OnInit {
  profile$!: Observable<Profile | ResponseError | ResponseLoading>;

  /** @internal */ isError = _isProfileResponseError;

  /** @internal */ isProfile = _isProfile;

  constructor(
    public dialogRef: MatDialogRef<SearchProfileDialogComponent>,
    private queryService: QueryService,
    private profileSelectorSearchService: ProfileSelectorSearchService
  ) {}

  ngOnInit() {
    this.requestProfile();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private requestProfile() {
    const idParam = this.queryService.getParams()['params'].id;

    this.profile$ = this.profileSelectorSearchService.getProfile();

    this.profileSelectorSearchService.init(idParam);
  }
}
