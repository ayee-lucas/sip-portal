import { Component, OnInit } from '@angular/core';
import { AuditQueryService } from 'src/app/query/services/audit-query.service';
import { Params } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AddUserService } from '../../services/add-user.service';
import { User } from '../../types/response-type-users';

export type NewUserForm = {
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  status: FormControl<boolean | null>;
  profileId: FormControl<number | null>;
};

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  modalOpen = false;

  newUserForm!: FormGroup<NewUserForm>;

  paramsAtInit!: Params;

  selectOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];

  constructor(
    private queryService: AuditQueryService,
    private fb: FormBuilder,
    private addUserService: AddUserService
  ) {}

  ngOnInit() {
    if (this.queryService.getParams()['params'].new) {
      this.openModal();
    }
  }

  openModal() {
    this.paramsAtInit = this.queryService.getParams();

    if (!this.paramsAtInit['params'].new) {
      this.queryService.setParams({ new: true });
    }

    this.buildForm();

    this.modalOpen = true;
  }

  closeModal() {
    this.queryService.setParams(this.paramsAtInit['params']);

    if (this.paramsAtInit['params'].new) {
      this.queryService.deleteParam('new');
    }

    this.modalOpen = false;
  }

  onSubmit() {
    if (this.newUserForm.invalid) {
      return;
    }

    const { name, lastName, email, status, profileId } = this.newUserForm.value;

    console.log(name, lastName, email, status, profileId);

    if (!name || !lastName || !email || status == null || !profileId) {
      return;
    }

    const data: User = {
      userId: 0,
      names: name,
      lastNames: lastName,
      email: email,
      status: status,
      profileId: profileId
    };

    this.addUserService.init(data);
  }

  private buildForm() {
    this.newUserForm = this.fb.group({
      name: new FormControl<string | null>('', Validators.required),
      lastName: new FormControl<string | null>('', Validators.required),
      email: new FormControl<string | null>('', [
        Validators.required,
        Validators.email
      ]),
      status: new FormControl<boolean | null>(false, Validators.required),
      profileId: new FormControl<number | null>(0, Validators.required)
    });
  }
}
