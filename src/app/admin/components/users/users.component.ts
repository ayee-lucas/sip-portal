import { Component, OnInit } from '@angular/core';
import { UserRequestService } from '../../services/users/user-request.service';
import { map, Observable } from 'rxjs';
import { ResponseUserSuccess } from '../../types/response-type-users';
import { QueryService } from '../../../query/services/query.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-components',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  responseUser$!: Observable<ResponseUserSuccess>;
  params!: Params;

  constructor(
    private userOperationService: UserRequestService,
    private queryService: QueryService
  ) {}

  ngOnInit() {
    this.params = this.queryService.getParams();

    this.setDefaultParams(this.params);

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
