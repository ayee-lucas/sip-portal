import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../types/response-type-users';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { QueryService } from '../../../../query/services/query.service';
import { UserUpdateService } from '../../../services/user-update.service';
import { UserSelectorService } from '../../../services/user-selector.service';

type UpdateUserForm = {
  name: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  status: FormControl<boolean>;
  profile: FormControl<number>;
};

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {
  updateUserForm!: FormGroup<UpdateUserForm>;

  @Input() selectedUser!: User;

  selectOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
  ];

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private selectedUserService: UserSelectorService,
    private updateUserService: UserUpdateService
  ) {}

  ngOnInit() {
    this.buildUpdateUserForm();
    this.patchForm();
  }

  onSubmit() {
    if (this.updateUserForm.invalid) {
      return;
    }

    const formValue = this.updateUserForm.getRawValue();

    const data: User = {
      userId: this.selectedUser.userId,
      names: formValue.name,
      lastNames: formValue.lastName,
      email: formValue.email,
      status: formValue.status,
      profileId: formValue.profile
    };

    this.selectedUserService.setUserSelected(data);

    this.updateUserService.init(data);
  }

  patchForm() {
    const params = this.queryService.getParams();

    this.updateUserForm.patchValue({
      ...params['params'],
      status: params['params'].status === 'true'
    });
  }

  private buildUpdateUserForm() {
    this.updateUserForm = this.fb.nonNullable.group({
      name: [this.selectedUser.names, Validators.required],
      lastName: [this.selectedUser.lastNames, Validators.required],
      email: [this.selectedUser.email, [Validators.email, Validators.required]],
      status: [this.selectedUser.status, Validators.required],
      profile: [this.selectedUser.profileId, Validators.required]
    });
  }
}
