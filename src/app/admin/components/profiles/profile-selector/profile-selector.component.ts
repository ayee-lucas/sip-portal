import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSelectorService } from '../../../services/user-selector.service';
import { Profile } from '../../../types/response-type-profiles';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html'
})
export class ProfileSelectorComponent {
  @Input() profiles!: Profile[] | null;

  responseSelected$!: Observable<Profile | null>;

  constructor(private selectedUserService: UserSelectorService) {}
}
