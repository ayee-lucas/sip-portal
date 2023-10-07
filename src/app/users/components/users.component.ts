import { Component, OnInit } from '@angular/core';
import { UserOperationService } from '../services/user-operation.service';
import { map, Observable } from 'rxjs';
import { ResponseUserSuccess } from '../types/response-type-users';
import { AuditQueryService } from '../../query/services/audit-query.service';
import { Params } from '@angular/router';
import { User } from '../../audit/mocks/data';

@Component({
  selector: 'app-components',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  responseUser$!: Observable<ResponseUserSuccess>;
  params!: Params;

  userSelected: User | null = null;

  constructor(
    private userOperationService: UserOperationService,
    private queryService: AuditQueryService
  ) {}

  ngOnInit() {
    this.params = this.queryService.getParams();

    if (!this.params['params'].page) {
      this.queryService.updateParams({ ...this.params['params'], page: 0 });
    }

    if (!this.params['params'].size) {
      this.queryService.updateParams({ ...this.params['params'], size: 10 });
    }

    if (!this.params['params'].sort) {
      this.queryService.updateParams({
        ...this.params['params'],
        sort: 'userId'
      });
    }

    this.requestUsers(this.params);
  }

  refresh() {
    this.userOperationService.refresh();
  }

  private requestUsers(params: Params) {
    this.responseUser$ = this.userOperationService.getUsers().pipe(
      map(data => {
        if ('loading' in data) {
          console.log('Loading: ', data);
        }

        if ('error' in data) {
          console.log('Error: ', data);
        }

        return data as ResponseUserSuccess;
      })
    );

    this.userOperationService.init(params['params']);
  }
}
