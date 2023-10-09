import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../mocks/data';
import { AuditQueryService } from '../../query/services/audit-query.service';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  data: User[] = [];
  _params!: Params;

  constructor(
    private userService: UserService,
    private queryService: AuditQueryService,
    private TranslateService: TranslateService
  ) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }

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
