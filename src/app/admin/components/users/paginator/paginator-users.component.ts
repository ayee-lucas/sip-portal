import { Component, Input } from '@angular/core';
import { UserOperationService } from '../../../services/user-operation.service';
import { QueryService } from '../../../../query/services/query.service';
import { ResponseUserSuccess } from '../../../types/response-type-users';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator-users',
  templateUrl: './paginator-users.component.html'
})
export class PaginatorUsersComponent {
  @Input() responsePage!: ResponseUserSuccess | null;

  options = [5, 10, 15, 20];

  constructor(
    private queryService: QueryService,
    private userOperationService: UserOperationService
  ) {}

  pageHandler(e: PageEvent) {
    const params = this.queryService.getParams();

    this.queryService.updateParams({ size: e.pageSize, page: e.pageIndex });

    this.userOperationService.init({
      sort: params['params'].sort,
      page: e.pageIndex,
      size: e.pageSize
    });
  }
}
