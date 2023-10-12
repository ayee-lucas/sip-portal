import { Injectable } from '@angular/core';
import { Profile } from '../types/response-type-profiles';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileSelectorService {
  private profileSelected$ = new BehaviorSubject<Profile | null>(null);
}
