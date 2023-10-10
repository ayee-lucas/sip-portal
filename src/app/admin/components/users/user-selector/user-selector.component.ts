import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../types/response-type-users';
import { Observable } from 'rxjs';
import { UserSelectorService } from '../../../services/user-selector.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html'
})
export class UserSelectorComponent implements OnInit {
  @Input() responseUser!: User[] | undefined;

  userSelected$!: Observable<User | null>;

  constructor(private selectedUserService: UserSelectorService) {}

  ngOnInit() {
    this.userSelected$ = this.selectedUserService.getUserSelected();
  }

  tracking(index: number, item: User) {
    return item.userId;
  }

  selectUser(user: User) {
    this.selectedUserService.setUserSelected(user);
  }
}
