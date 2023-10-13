import { Injectable } from '@angular/core';
import { Profile } from '../types/response-type-profiles';
import { BehaviorSubject, Observable } from 'rxjs';
import { QueryService } from '../../query/services/query.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileSelectorService {
  private profileSelected$ = new BehaviorSubject<Profile | null>(null);

  constructor(private queryService: QueryService) {}

  getProfile(): Observable<Profile | null> {
    return this.profileSelected$;
  }

  setSelectedProfile(profile: Profile) {
    if (profile) {
      this.queryService.updateParams({
        selected: profile.profileId,
        name: profile.name,
        description: profile.description_profile,
        status: profile.status
      });
    }

    this.profileSelected$.next(profile);
  }
}
