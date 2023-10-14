import { Component, OnInit } from '@angular/core';
import { ResponseProfile } from '../../types/response-type-profiles';
import { Observable } from 'rxjs';
import { ProfileRequestService } from '../../services/profile-request.service';
import { QueryService } from '../../../query/services/query.service';
import { _IsProfileSuccess } from '../../../shared/utils/TypeGuards';
import { Params } from '@angular/router';

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

    this.setDefaultParams(params);
  }

  ngOnInit() {
    const params = this.queryService.getParams();

    this.profiles$ = this.profileRequest.getProfiles();

    this.profileRequest.init(params['params']);
  }

  refresh() {
    this.profileRequest.refresh();
  }

  private setDefaultParams(params: Params) {
    const paramsValues = params['params'];

    if (!paramsValues.page || !paramsValues.sort || !paramsValues.size) {
      this.queryService.updateParams({
        page: 0,
        sort: 'profileId',
        size: 10
      });
    }
  }
}
