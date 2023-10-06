import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../types/response-type-users';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Observable } from 'rxjs';
import { SelectedUserService } from '../../services/selected-user.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {
  @Input() responseUser!: User[] | undefined;

  userSelected$!: Observable<User | null>;

  constructor(
    private queryService: AuditQueryService,
    private selectedUserService: SelectedUserService
  ) {}

  ngOnInit() {
    this.userSelected$ = this.selectedUserService.getUserSelected();
  }

  tracking(index: number, item: User) {
    return item.userId;
  }

  selectUser(user: User) {
    this.queryService.updateParams({
      selected: user.userId,
      name: user.names,
      lastName: user.lastNames,
      email: user.email,
      status: user.status
    });
    this.selectedUserService.setUserSelected(user);
  }
}
