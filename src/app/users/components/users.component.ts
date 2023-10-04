import { Component, OnInit } from '@angular/core';
import { UserOperationService } from '../services/user-operation.service';
import { map, Observable } from 'rxjs';
import { ResponseUserSuccess } from '../types/response-type-users';

@Component({
  selector: 'app-components',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  responseUser$!: Observable<ResponseUserSuccess>;

  constructor(private userOperationService: UserOperationService) {}

  ngOnInit() {
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

    this.userOperationService.init();
  }

  refresh() {
    this.userOperationService.refresh();
    this.userOperationService.init();
  }
}
