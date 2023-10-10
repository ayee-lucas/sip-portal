import { Component, Input, OnInit } from '@angular/core';
import { UserOperationService } from '../../../services/user-operation.service';
import { QueryService } from '../../../../query/services/query.service';
import { Params } from '@angular/router';
import { ResponseUserSuccess } from '../../../types/response-type-users';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator-users',
  templateUrl: './paginator-users.component.html'
})
export class PaginatorUsersComponent implements OnInit {
  @Input() responsePage!: ResponseUserSuccess | null;
  params!: Params;

  options = [5, 10, 15, 20];

  constructor(
    private queryService: QueryService,
    private userOperationService: UserOperationService
  ) {}

  ngOnInit() {
    this.params = this.queryService.getParams();
  }

  pageHandler(e: PageEvent) {
    this.queryService.updateParams({ size: e.pageSize, page: e.pageIndex });
    this.userOperationService.init({
      ...this.params['params'],
      page: e.pageIndex,
      size: e.pageSize
    });

    console.log(e);
  }
}
