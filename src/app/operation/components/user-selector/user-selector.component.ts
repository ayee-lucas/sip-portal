import { Component, OnInit } from '@angular/core';
import { UserOperationService } from '../../services/user-operation.service';
import { Observable } from 'rxjs';
import { ResponseOperationUser } from '../../types/response-type-operation';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {
  response$!: Observable<ResponseOperationUser[]>;

  constructor(private operationService: UserOperationService) {}

  ngOnInit(): void {
    this.response$ = this.operationService.getUsers();

    this.operationService.init();
  }
}
