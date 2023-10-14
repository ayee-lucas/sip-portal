import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../query/services/query.service';
import {
  ResponseError,
  ResponseLoading
} from '../../../types/response-type-users';
import { Observable } from 'rxjs';
import { Profile } from '../../../types/response-type-profiles';
import { ProfileSelectorSearchService } from '../../../services/profiles/profile-selector-search.service';
import {
  _isProfile,
  _isProfileResponseError
} from '../../../../shared/utils/TypeGuards';
import { ProfileSelectorService } from '../../../services/profiles/profile-selector.service';

@Component({
  selector: 'app-search-profile-dialog',
  templateUrl: './search-profile-dialog.component.html'
})
export class SearchProfileDialogComponent implements OnInit {
  profile$!: Observable<Profile | ResponseError | ResponseLoading>;

  /** @internal */ isError = _isProfileResponseError;

  /** @internal */ isProfile = _isProfile;

  constructor(
    private queryService: QueryService,
    private profileSelectorSearchService: ProfileSelectorSearchService,
    private profileSelectorService: ProfileSelectorService
  ) {}

  ngOnInit() {
    this.requestProfile();
  }

  setProfile(profile: Profile) {
    this.profileSelectorService.setSelectedProfile(profile);
  }

  private requestProfile() {
    const idParam = this.queryService.getParams()['params'].id;

    this.profile$ = this.profileSelectorSearchService.getProfile();

    this.profileSelectorSearchService.init(idParam);
  }
}
