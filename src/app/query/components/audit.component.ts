import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../mocks/data';
import { QueryService } from '../services/query.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-query',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit {
  data: User[] = [];
  _params!: Params;

  constructor(
    private userService: UserService,
    private queryService: QueryService
  ) {}

  ngOnInit() {
    this.getUsers();

    this._params = this.queryService.getParams();

    if (!this._params['params'].size) {
      this.queryService.updateParams({ page: 0, size: 10 });
      return;
    }

    this.queryService.updateParams({ page: 0 });
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.data = users;
    });
  }
}
