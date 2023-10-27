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
  _params: Params;

  constructor(
    private userService: UserService,
    private queryService: QueryService
  ) {
    this._params = this.queryService.getParams();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getAuditData(this._params['page'], this._params['size'])
      .subscribe({
        next: (data: any) => {
          this.data = data.content;
        },
        error: err => {
          console.log('Error: ', err);
        }
      });
  }
}
