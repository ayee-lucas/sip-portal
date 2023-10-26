import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Profile } from '../../../types/response-type-profiles';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryService } from '../../../../query/services/query.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProfileUpdateService } from '../../../services/profiles/profile-update.service';
import { MessageService } from 'primeng/api';
import { Group, ProfileForm } from '../../../types/profiles-type';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  buildFormPermissions,
  buildQueriesGroup,
  buildSettingsGroup,
  groupSettingsBehaviour,
  singleSettingBehaviour
} from '../../../../shared/utils/group-behaviour-handler';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDeleteDialogComponent } from '../profile-delete-dialog/profile-delete-dialog.component';
import { ProfileDeleteService } from '../../../services/profiles/profile-delete.service';

/**
 * @todo Validate the form on toggle change
 * @todo Fix Form Reset on PatchForm()
 */

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html'
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  @Input() selectedProfile!: Profile | null;
  updateProfileForm!: FormGroup<ProfileForm>;
  settingsGroup!: Group;
  queriesGroup!: Group;

  selectOptions = [
    { value: true, label: 'userSelector.active' },
    { value: false, label: 'userSelector.inactive' }
  ];
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private profileUpdateService: ProfileUpdateService,
    private profileDeleteService: ProfileDeleteService,
    public dialog: MatDialog
  ) {}

  private get permissions() {
    return this.updateProfileForm.get('permissions') as FormArray;
  }

  ngOnInit() {
    this.buildUpdateProfileForm();

    const newParam = this.queryService.getParams()['params'].new;

    if (newParam) {
      this.queryService.deleteParam('new');
    }

    this.buildGroups();
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

    const permissionsData = permissions.filter(
      (permission: string) =>
        permission !== null && permission !== undefined && permission !== ''
    );

    const data: Profile = {
      profileId: this.selectedProfile.profileId,
      name: name,
      description_profile: description_profile,
      status: status,
      resources: permissionsData
    };

    this.profileUpdateService.init(data);
  }

  changeGroupSettings(e: MatSlideToggleChange, group: Group) {
    groupSettingsBehaviour({ e, group, resources: this.permissions });
  }

  changeSingleSetting(e: MatSlideToggleChange, group: Group, id: string) {
    singleSettingBehaviour({ e, group, id, resources: this.permissions });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ProfileDeleteDialogComponent, {
      width: '500px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedProfile) {
        this.profileDeleteService.deleteProfile(this.selectedProfile.profileId);

        return;
      }
    });
  }

  private buildGroups() {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.settingsGroup = buildSettingsGroup(params);

        this.queriesGroup = buildQueriesGroup(params);

        buildFormPermissions(params, this.permissions);
      });
  }

  private buildUpdateProfileForm() {
    const query = this.queryService.getParams();

    this.updateProfileForm = this.fb.group({
      name: [query['params'].name ?? '', Validators.required],
      description_profile: [
        query['params'].description ?? '',
        Validators.required
      ],
      status: [!!query['params'].status ?? false, Validators.required],
      permissions: this.fb.array([this.fb.control('')])
    });
  }
}
