import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { Group } from '../../admin/types/profiles-type';
import { FormArray, FormControl } from '@angular/forms';
import { Params } from '@angular/router';
import { ROLES } from './config';

type PropsChangeGroup = {
  e: MatSlideToggleChange;
  group: Group;
  resources: FormArray;
};

type PropsSingleSetting = {
  e: MatSlideToggleChange;
  group: Group;
  id: string;
  resources: FormArray;
};

export function groupSettingsBehaviour({
  e,
  group,
  resources
}: PropsChangeGroup) {
  group.groupChecked = e.checked;
  group.children.map(child => {
    const id = child.id;

    singleSettingBehaviour({ e, group, id, resources });
  });
}

export function singleSettingBehaviour({
  e,
  group,
  id,
  resources
}: PropsSingleSetting) {
  const child = group.children.find(child => child.id === id);

  if (!child) {
    return;
  }

  if (child.checked === e.checked) {
    return;
  }

  child.checked = e.checked;

  if (resources.length === 0) {
    addPermission(id, resources);

    console.log(resources.value);
    return;
  }

  if (resources.at(resources.value.indexOf(id)).value === id) {
    resources.removeAt(resources.value.indexOf(id));

    checkALlOptions(group);

    console.log(resources.value);
    return;
  }

  addPermission(id, resources);

  checkALlOptions(group);
  console.log(resources.value);
}

function addPermission(permission: string, resources: FormArray) {
  resources.push(new FormControl(permission));
}

export function checkALlOptions(group: Group) {
  const AllChecked = group.children.every(child => {
    return child.checked;
  });

  if (AllChecked) {
    group.groupChecked = true;

    return;
  }

  group.groupChecked = false;
}

export function buildFormPermissions(params: Params, resources: FormArray) {
  resources.clear();

  const user = params['users'] === 'true' ? ROLES.USERS : '';

  if (user) addPermission(user, resources);

  const profiles = params['profilesRole'] === 'true' ? ROLES.PROFILES : '';
  if (profiles) addPermission(profiles, resources);

  const audit = params['audit'] === 'true' ? ROLES.AUDIT : '';
  if (audit) addPermission(audit, resources);
}

export function buildSettingsGroup(params?: Params) {
  if (params) {
    const settingsGroup = {
      groupChecked: false,
      children: [
        {
          id: ROLES.PROFILES,
          label: 'Perfiles',
          checked: params['profilesRole'] === 'true'
        },
        {
          id: ROLES.USERS,
          label: 'Usuarios',
          checked: params['users'] === 'true'
        }
      ]
    };

    checkALlOptions(settingsGroup);

    return settingsGroup;
  }

  return {
    groupChecked: false,
    children: [
      {
        id: ROLES.PROFILES,
        label: 'Perfiles',
        checked: false
      },
      {
        id: ROLES.USERS,
        label: 'Usuarios',
        checked: false
      }
    ]
  };
}

export function buildQueriesGroup(params?: Params) {
  if (params) {
    const queriesGroup = {
      groupChecked: false,
      children: [
        {
          id: ROLES.AUDIT,
          label: 'Auditoria',
          checked: params['audit'] === 'true'
        }
      ]
    };

    checkALlOptions(queriesGroup);

    return queriesGroup;
  }

  return {
    groupChecked: false,
    children: [
      {
        id: ROLES.AUDIT,
        label: 'Auditoria',
        checked: false
      }
    ]
  };
}
