import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueryService } from '../../../../query/services/query.service';
import { Params } from '@angular/router';
import { ProfileSelectorService } from '../../../services/profiles/profile-selector.service';
import { Observable } from 'rxjs';
import { Profile } from '../../../types/response-type-profiles';

@Component({
  selector: 'app-profile-wrapper',
  templateUrl: './profile-wrapper.component.html'
})
export class ProfileWrapperComponent implements OnInit, OnDestroy {
  // Params object to be used in the ngOnInit method
  params: Params;

  selectedProfile$!: Observable<Profile | null>;

  // Injecting the services to be used in the component

  /**
   * This method is called when the component is initialized
   * it uses the queryService to get the params object from the URL
   * assigns the params object to the params property
   *
   * @param queryService
   * @param profileSelectorService
   */
  constructor(
    private queryService: QueryService,
    private profileSelectorService: ProfileSelectorService
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
    this.selectedProfile$ = this.profileSelectorService.getProfile();

    const selectParam = this.params['params'].selected;

    if (selectParam && selectParam > 0) {
      this.profileSelectorService.setSelectedProfile(selectParam);
      return;
    }

    this.queryService.updateParams({ new: true });
  }

  ngOnDestroy() {
    this.profileSelectorService.clearProfile();
  }

  toggleAddProfile() {
    const params = this.queryService.getParams();

    this.queryService.setParams({
      page: params['params'].page,
      size: params['params'].size,
      sort: params['params'].sort,
      new: true
    });

    this.profileSelectorService.clearProfile();
  }
}
