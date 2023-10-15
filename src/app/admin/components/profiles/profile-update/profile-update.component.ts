import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Profile } from '../../../types/response-type-profiles';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { QueryService } from '../../../../query/services/query.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ROLES } from '../../../../shared/utils/config';

type UpdateProfileForm = {
  name: FormControl<string | null>;
  description_profile: FormControl<string | null>;
  status: FormControl<boolean | null>;
  permissions: FormArray;
};

type Group = {
  groupChecked: boolean;
  children: Children[];
};

type Children = {
  id: string;
  label: string;
  checked: boolean;
};

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html'
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  @Input() selectedProfile!: Profile | null;
  updateProfileForm!: FormGroup<UpdateProfileForm>;
  settings!: Group;
  requestPermissions!: Group;

  selectOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
  ];
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private profileUpdateService: ProfileUpdateService
  ) {}

  private get permissions() {
    return this.updateProfileForm.get('permissions') as FormArray;
  }

  ngOnInit() {
    this.buildUpdateProfileForm();

    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.buildSettings();
        this.buildRequestPermissions();
        this.buildFormPermissions(params);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (this.updateProfileForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all the required fields'
      });
      return;
    }

    if (!this.selectedProfile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Selected profile not found'
      });
      return;
    }

    const { name, description_profile, status, permissions } =
      this.updateProfileForm.value;

    if (!name || !description_profile || status == null || !permissions) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all the required fields'
      });
      return;
    }

    const data: Profile = {
      profileId: this.selectedProfile.profileId,
      name: name,
      description_profile: description_profile,
      status: status,
      resources: permissions
    };

    this.profileUpdateService.init(data);
  }

  patchForm() {
    const params = this.queryService.getParams();

    this.updateProfileForm.patchValue({
      name: params['params'].name,
      description_profile: params['params'].description,
      status: params['params'].status === 'true'
    });
  }

  changeGroupSettings(e: MatSlideToggleChange, group: Group) {
    group.groupChecked = e.checked;
    group.children.map(child => {
      this.changeSingleSetting(e, group, child.id);
    });
  }

  changeSingleSetting(e: MatSlideToggleChange, group: Group, id: string) {
    const child = group.children.find(child => child.id === id);

    if (!child) {
      return;
    }

    child.checked = e.checked;

    if (this.permissions.length === 0) {
      this.addPermission(id);
      return;
    }

    if (this.permissions.at(this.permissions.value.indexOf(id)).value === id) {
      this.permissions.removeAt(this.permissions.value.indexOf(id));

      this.checkALlOptions(group);
      return;
    }

    this.addPermission(id);

    this.checkALlOptions(group);
  }

  private addPermission(permission: string) {
    this.permissions.push(this.fb.control(permission));
  }

  private buildUpdateProfileForm() {
    this.updateProfileForm = this.fb.group({
      name: ['', Validators.required],
      description_profile: ['', Validators.required],
      status: [false, Validators.required],
      permissions: this.fb.array([this.fb.control('')])
    });
  }

  private checkALlOptions(group: Group) {
    const AllChecked = group.children.every(child => {
      return child.checked;
    });

    if (AllChecked) {
      group.groupChecked = true;

      return;
    }

    group.groupChecked = false;
  }

  private buildSettings() {
    const params = this.queryService.getParams();

    this.settings = {
      groupChecked: false,
      children: [
        {
          id: ROLES.PROFILES,
          label: 'Perfiles',
          checked: params['params'].profilesRole === 'true'
        },
        {
          id: ROLES.USERS,
          label: 'Usuarios',
          checked: params['params'].users === 'true'
        }
      ]
    };

    this.checkALlOptions(this.settings);
  }

  private buildRequestPermissions() {
    const params = this.queryService.getParams();

    this.requestPermissions = {
      groupChecked: false,
      children: [
        {
          id: ROLES.AUDIT,
          label: 'Auditoria',
          checked: params['params'].audit === 'true'
        }
      ]
    };

    this.checkALlOptions(this.requestPermissions);
  }

  private buildFormPermissions(params: Params) {
    this.permissions.clear();

    const user = params['users'] === 'true' ? ROLES.USERS : '';

    if (user) this.addPermission(user);

    const profiles = params['profilesRole'] === 'true' ? ROLES.PROFILES : '';
    if (profiles) this.addPermission(profiles);

    const audit = params['audit'] === 'true' ? ROLES.AUDIT : '';
    if (audit) this.addPermission(audit);
  }
}
