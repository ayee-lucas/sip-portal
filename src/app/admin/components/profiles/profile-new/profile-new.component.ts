import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group, ProfileForm } from '../../../types/profiles-type';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  buildQueriesGroup,
  buildSettingsGroup,
  groupSettingsBehaviour,
  singleSettingBehaviour
} from '../../../../shared/utils/group-behaviour-handler';
import { MessageService } from 'primeng/api';
import { ProfileNewService } from '../../../services/profiles/profile-new.service';
import { Profile } from '../../../types/response-type-profiles';

@Component({
  selector: 'app-profile-new',
  templateUrl: './profile-new.component.html'
})
export class ProfileNewComponent implements OnInit {
  newProfileForm!: FormGroup<ProfileForm>;
  selectOptions = [
    { value: true, label: 'userSelector.active' },
    { value: false, label: 'userSelector.inactive' }
  ];

  settingsGroup!: Group;
  queriesGroup!: Group;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private profileNewService: ProfileNewService
  ) {}

  get permissions() {
    return this.newProfileForm.get('permissions') as FormArray;
  }

  ngOnInit() {
    this.buildNewProfileForm();

    this.buildGroups();
  }

  onSubmit() {
    const { name, description_profile, status, permissions } =
      this.newProfileForm.value;

    if (
      !name ||
      !description_profile ||
      status === null ||
      status === undefined ||
      !permissions
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all the required fields'
      });

      return;
    }

    const permissionsData = permissions.filter(
      (permission: string) =>
        permission !== null && permission !== undefined && permission !== ''
    );

    const data: Profile = {
      profileId: 0,
      name: name.trim(),
      description_profile: description_profile.trim(),
      status,
      resources: permissionsData
    };

    this.profileNewService.addProfile(data);
  }

  changeGroupSettings(e: MatSlideToggleChange, group: Group) {
    groupSettingsBehaviour({ e, group, resources: this.permissions });
  }

  changeSingleSetting(e: MatSlideToggleChange, group: Group, id: string) {
    singleSettingBehaviour({ e, group, id, resources: this.permissions });
  }

  private buildGroups() {
    this.settingsGroup = buildSettingsGroup();
    this.queriesGroup = buildQueriesGroup();
  }

  private buildNewProfileForm() {
    this.newProfileForm = this.fb.group({
      name: ['', Validators.required],
      description_profile: ['', Validators.required],
      status: [false, Validators.required],
      permissions: this.fb.array([this.fb.control('')])
    });
  }
}
