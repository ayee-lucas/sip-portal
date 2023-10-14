import { Component, Input } from '@angular/core';
import { Profile } from '../../../types/response-type-profiles';
import { ProfileSelectorService } from '../../../services/profiles/profile-selector.service';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html'
})
export class ProfileSelectorComponent {
  @Input() profiles!: Profile[] | null;

  constructor(private profileSelectorService: ProfileSelectorService) {}

  setProfile(profile: Profile) {
    this.profileSelectorService.setSelectedProfile(profile);
  }
}
