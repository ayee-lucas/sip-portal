import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators
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
  searchForm: FormGroup;

  constructor(
    private operationService: UserOperationService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]] // Add a required validator
    });
  }

  ngOnInit(): void {
    this.response$ = this.operationService.getUsers();
    this.operationService.init();
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const searchValue = this.searchForm.value.search;
      console.log('Searching for:', searchValue);
    }
  }
}
