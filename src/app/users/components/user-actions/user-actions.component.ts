import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../types/response-type-users';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Params } from '@angular/router';

type UpdateUserForm = {
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  status: FormControl<boolean | null>;
};

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  @Input() selectedUser!: User;

  updateUserForm!: FormGroup<UpdateUserForm>;

  params: Params;

  selectOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
  ];

  constructor(
    private fb: FormBuilder,
    private queryService: AuditQueryService
  ) {
    this.params = this.queryService.getParams();
  }

  ngOnInit() {
    this.buildUpdateUserForm();
    this.patchForm();
  }

  onSubmit() {
    if (this.updateUserForm.valid) {
      console.log(this.updateUserForm.value);
    }
  }

  private buildUpdateUserForm() {
    this.updateUserForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      status: [false, Validators.required]
    });
  }

  private patchForm() {
    this.updateUserForm.patchValue({
      ...this.params['params'],
      status: this.params['params'].status === 'true'
    });
  }
}
