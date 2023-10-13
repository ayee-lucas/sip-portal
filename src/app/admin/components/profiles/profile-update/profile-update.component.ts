import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../../types/response-type-profiles';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { QueryService } from '../../../../query/services/query.service';

type UpdateProfileForm = {
  name: FormControl<string | null>;
  description_profile: FormControl<string | null>;
  status: FormControl<boolean | null>;
};

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html'
})
export class ProfileUpdateComponent implements OnInit {
  @Input() selectedProfile!: Profile;

  updateProfileForm!: FormGroup<UpdateProfileForm>;

  selectOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
  ];

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService
  ) {}

  ngOnInit() {
    this.buildUpdateProfileForm();
    this.patchForm();
  }

  onSubmit() {
    console.log(this.updateProfileForm.value);
  }

  buildUpdateProfileForm() {
    this.updateProfileForm = this.fb.group({
      name: [this.selectedProfile.name, Validators.required],
      description_profile: [
        this.selectedProfile.description_profile,
        Validators.required
      ],
      status: [this.selectedProfile.status, Validators.required]
    });
  }

  patchForm() {
    const params = this.queryService.getParams();

    this.updateProfileForm.patchValue({
      ...params['params'],
      status: params['params'].status === 'true'
    });
  }
}
