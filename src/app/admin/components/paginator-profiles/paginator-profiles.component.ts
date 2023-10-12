import { Component, Input } from '@angular/core';
import { QueryService } from '../../../query/services/query.service';
import { ProfileRequestService } from '../../services/profile-request.service';
import { PageEvent } from '@angular/material/paginator';
import { ResponseProfileSuccess } from '../../types/response-type-profiles';

@Component({
  selector: 'app-paginator-profiles',
  templateUrl: './paginator-profiles.component.html'
})
export class PaginatorProfilesComponent {
  @Input() responsePage!: ResponseProfileSuccess | null;
  options = [5, 10, 15, 20];

  constructor(
    private queryService: QueryService,
    private profileRequestService: ProfileRequestService
  ) {}

  pageHandler(e: PageEvent) {
    const params = this.queryService.getParams();

    this.queryService.updateParams({ size: e.pageSize, page: e.pageIndex });
    this.profileRequestService.init({
      sort: params['params'].sort,
      page: e.pageIndex,
      size: e.pageSize
    });
  }
}
