import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileSelectorService } from '../../../services/profiles/profile-selector.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Profile } from '../../../types/response-type-profiles';
import { QueryService } from '../../../../query/services/query.service';
import { ProfileSelectorSearchService } from '../../../services/profiles/profile-selector-search.service';
import { Params } from '@angular/router';
import { _isProfile } from '../../../../shared/utils/TypeGuards';

@Component({
  selector: 'app-profile-wrapper',
  templateUrl: './profile-wrapper.component.html'
})
export class ProfileWrapperComponent implements OnInit, OnDestroy {
  // Profile selected observable to be used in the template
  profileSelected$!: Observable<Profile | null>;

  // Params object to be used in the ngOnInit method
  params: Params;

  // Unsubscribe subject to be used in the ngOnDestroy method
  private unsubscribe$ = new Subject<boolean>();

  // Type guard to check if the object is a Profile
  /**
   * @private
   * @internal
   */
  private isProfile = _isProfile;

  // Injecting the services to be used in the component

  /**
   * This method is called when the component is initialized
   * it uses the queryService to get the params object from the URL
   * assigns the params object to the params property
   *
   * @param profileSelectorService
   * @param profileSelectorSearchService
   * @param queryService
   */
  constructor(
    private profileSelectorService: ProfileSelectorService,
    private profileSelectorSearchService: ProfileSelectorSearchService,
    private queryService: QueryService
  ) {
    this.params = this.queryService.getParams();
  }

  // OnInit method

  /**
   * This method is called when the component is initialized
   * Checks if the selected param exists and is greater than 0, calls the requestProfile method
   * to fetch the profile data from the API when the component is initialized
   *
   * @returns void
   * @memberof ProfileWrapperComponent
   */
  ngOnInit() {
    const selectParam = this.params['params'].selected;

    if (selectParam && selectParam > 0) {
      this.requestProfile();

      this.profileSelectorSearchService.init(selectParam);

      return;
    }

    this.profileSelected$ = this.profileSelectorService.getProfile();
  }

  // OnDestroy method

  /**
   * This method is called when the component is destroyed
   * Handles the unsubscription from the profileSelected$ observable
   * @returns void
   * @memberof ProfileWrapperComponent
   */
  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  // Request profile method

  /**
   * This method is called when the component is initialized
   * Calls the getProfile method from the profileSelectorSearchService
   * to fetch the profile data from the API when the component is initialized
   * @private
   * @returns void
   * @memberof ProfileWrapperComponent
   */
  private requestProfile() {
    this.profileSelectorSearchService
      .getProfile()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if (this.isProfile(data)) {
          this.profileSelectorService.setSelectedProfile(data);

          this.profileSelected$ = this.profileSelectorService.getProfile();
        }
      });
  }
}
