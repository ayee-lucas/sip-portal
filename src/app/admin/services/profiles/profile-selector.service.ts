import { Injectable } from '@angular/core';
import { Profile } from '../../types/response-type-profiles';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { QueryService } from '../../../query/services/query.service';
import { ProfileSelectorSearchService } from './profile-selector-search.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileSelectorService {
  private profileSelected$ = new BehaviorSubject<Profile | null>(null);

  constructor(
    private queryService: QueryService,
    private profileSelectorSearchService: ProfileSelectorSearchService
  ) {}

  getProfile(): Observable<Profile | null> {
    return this.profileSelected$;
  }

  clearProfile() {
    this.profileSelected$.next(null);
  }

  setSelectedProfile(id: number) {
    if (!id) {
      return;
    }

    this.profileSelectorSearchService
      .getProfile()
      .pipe(
        map(res => {
          if ('error' in res) {
            console.log('error', res);
          }

          if ('loading' in res) {
            console.log('loading', res);
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

    this.profileSelectorSearchService.init(id);
  }
}
