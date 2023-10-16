import { Injectable } from '@angular/core';
import { Profile } from '../../types/response-type-profiles';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { QueryService } from '../../../query/services/query.service';
import { ProfileGetByIdService } from './profile-get-by-id.service';

/**
 * ## ProfileSelectorService handles the state of the current selected profile.
 * @description Provides in Root of the application.
 * @class ProfileSelectorService
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileSelectorService {
  /**
   * profileSelected$ is a BehaviorSubject that holds the current selected profile
   * any subscriber will be notified of the changes.
   * @description Used to handle the state of the selected profile.
   * @private
   */
  private profileSelected$ = new BehaviorSubject<Profile | null>(null);

  /**
   * Injects the dependencies needed for this service.
   * @param queryService Used to handle the query params.
   * @param profileGetByIdService Used to retrieve the profile from the server.
   * @memberof ProfileSelectorService
   */
  constructor(
    private queryService: QueryService,
    private profileGetByIdService: ProfileGetByIdService
  ) {}

  /**
   * This method is used to retrieve the profileSelected$ BehaviorSubject.
   * @description It is meant to be called from the component consuming this service,
   * Returns an Observable of the profileSelected$ BehaviorSubject to be subscribed.
   * @returns Observable
   * @memberof ProfileSelectorService
   */
  getProfile(): Observable<Profile | null> {
    return this.profileSelected$;
  }

  /**
   * This method is used to clear the profileSelected$ BehaviorSubject.
   * @description It is meant to be called from the component consuming this service to clear the state.
   * @memberof ProfileSelectorService
   */
  clearProfile() {
    this.profileSelected$.next(null);
  }

  /**
   * This method is used to set the profileSelected$ BehaviorSubject state with the profile retrieved from the server.
   * @description It is meant to be called from the component consuming this service to set the state
   * of the current selected profile.
   * uses the profileGetByIdService to retrieve the profile from the server.
   * @param id The id of the profile to be retrieved.
   * @memberof ProfileSelectorService
   */
  setSelectedProfile(id: number) {
    if (!id) {
      return;
    }

    this.profileGetByIdService
      .getProfile()
      .pipe(
        map(res => {
          if ('error' in res) {
            return null;
          }

          if ('loading' in res) {
            return null;
          }

          return res as Profile | null;
        })
      )
      .subscribe(data => {
        if (data && data.profileId) {
          this.queryService.updateParams({
            selected: data.profileId,
            name: data.name,
            description: data.description_profile,
            status: data.status,
            profilesRole: data.resources?.includes('ROLE_PROFILES'),
            users: data.resources?.includes('ROLE_USERS'),
            audit: data.resources?.includes('ROLE_AUDIT')
          });

          this.profileSelected$.next(data);

          return;
        }

        this.profileSelected$.next(null);
      });

    this.profileGetByIdService.init(id);
  }
}
