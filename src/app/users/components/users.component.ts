import { Component } from '@angular/core';
import { ResponseOperationUser } from '../types/response-type-operation';

@Component({
  selector: 'app-components',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userSelected: ResponseOperationUser | undefined = undefined;
}
