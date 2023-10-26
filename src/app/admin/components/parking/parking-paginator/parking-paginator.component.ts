import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProfileRequestService } from 'src/app/admin/services/profiles/profile-request.service';
import { ResponseParkingSuccess } from 'src/app/admin/types/response-type-parking';
import { QueryService } from 'src/app/query/services/query.service';

@Component({
  selector: 'app-parking-paginator',
  templateUrl: './parking-paginator.component.html'
})
export class ParkingPaginatorComponent {
  @Input() responsePage!: ResponseParkingSuccess | null;

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
