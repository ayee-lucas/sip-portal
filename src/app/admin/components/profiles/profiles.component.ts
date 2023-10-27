import { Component, OnInit } from '@angular/core';
import { ResponseProfile } from '../../types/response-type-profiles';
import { Observable } from 'rxjs';
import { ProfileRequestService } from '../../services/profiles/profile-request.service';
import { QueryService } from '../../../query/services/query.service';
import { _IsProfileSuccess } from '../../../shared/utils/type-guards';
import { setDefaultParams } from 'src/app/shared/utils/default-params';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent implements OnInit {
  /** @internal */ isProfileSuccess = _IsProfileSuccess;

  profiles$!: Observable<ResponseProfile>;

  constructor(
    private profileRequest: ProfileRequestService,
    private queryService: QueryService
  ) {
    const params = this.queryService.getParams();

    setDefaultParams(params, 'profileId');
  }

  ngOnInit() {
    const params = this.queryService.getParams();

    this.profiles$ = this.profileRequest.getProfiles();

    this.profileRequest.init(params['params']);
  }

  refresh() {
    this.profileRequest.refresh();
  }
}
