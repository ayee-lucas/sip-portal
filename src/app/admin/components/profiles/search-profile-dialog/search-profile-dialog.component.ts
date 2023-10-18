import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../query/services/query.service';
import {
  ResponseError,
  ResponseLoading
} from '../../../types/response-type-users';
import { Observable } from 'rxjs';
import { Profile } from '../../../types/response-type-profiles';
import { ProfileGetByIdService } from '../../../services/profiles/profile-get-by-id.service';
import {
  _isProfile,
  _isProfileResponseError
} from '../../../../shared/utils/type-guards';
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
    private profileSelectorSearchService: ProfileGetByIdService,
    private profileSelectorService: ProfileSelectorService
  ) {}

  ngOnInit() {
    this.requestProfile();
  }

  /**
   * Change param to only receive the id number
   *
   * @todo
   * @param profile
   */
  setProfile(profile: Profile) {
    this.profileSelectorService.setSelectedProfile(profile.profileId);
  }

  private requestProfile() {
    const idParam = this.queryService.getParams()['params'].id;

    this.profile$ = this.profileSelectorSearchService.getProfile();

    this.profileSelectorSearchService.init(idParam);
  }
}
