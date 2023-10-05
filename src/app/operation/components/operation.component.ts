import { Component } from '@angular/core';
import { ResponseOperationUser } from '../types/response-type-operation';

@Component({
  selector: 'app-components',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent {
  userSelected: ResponseOperationUser | undefined = undefined;
}
