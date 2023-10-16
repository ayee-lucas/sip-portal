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

/**
 * this function is used to handle the behaviour group is called
 * when the user clicks on the toggle button for the whole group
 * it calls the singleSettingBehaviour function for each child
 * @param e The Material Slide Toggle Change event
 * @param group The group to be handled
 * @param resources The form array to be updated
 */
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

/**
 * this function is used to handle the behaviour of a single toggle
 * it is called when the user clicks on the toggle button for a single toggle
 * it updates the form array and checks calls the function to check if all
 * the toggles are checked
 * @param e The Material Slide Toggle Change event
 * @param group The group to be handled
 * @param id The id of the toggle to be handled
 * @param resources The form array to be updated
 */
export function singleSettingBehaviour({
  e,
  group,
  id,
  resources
}: PropsSingleSetting) {
  // find the child with the id
  const child = group.children.find(child => child.id === id);

  if (!child) {
    return;
  }

  // if the child is already checked, do nothing
  if (child.checked === e.checked) {
    return;
  }

  child.checked = e.checked;

  // if the form array is empty, add the permission
  if (resources.length === 0) {
    addResource(id, resources);

    return;
  }

  // if the permission is already in the form array, remove it
  if (resources.at(resources.value.indexOf(id)).value === id) {
    resources.removeAt(resources.value.indexOf(id));

    checkAllToggles(group);

    return;
  }

  // Finally, add the permission if all the conditions are met
  addResource(id, resources);

  checkAllToggles(group);
}

/**
 * this function is used to add a permission to the form array
 * it is called when the user clicks on the toggle button for a single toggle
 * @param role The role to be added
 * @param resources The form array to be updated
 */
function addResource(role: string, resources: FormArray) {
  resources.push(new FormControl(role));
}

/**
 * This function is used to check if all the toggles are checked
 * if all the toggles are checked, the group is checked
 * else, is unchecked
 * @param group The group to be checked
 */
export function checkAllToggles(group: Group) {
  const AllChecked = group.children.every(child => {
    return child.checked;
  });

  if (AllChecked) {
    group.groupChecked = true;

    return;
  }

  group.groupChecked = false;
}

/**
 * This function is used to build the form array with the permissions
 * it's meant to be called in the ngOnInit lifeCycle hook of the component
 * depending on the params, this will build the form array with the permissions
 * @param params The params object from the route
 * @param resources The form array to be built
 */
export function buildFormPermissions(params: Params, resources: FormArray) {
  // clear the form array
  resources.clear();

  const user = params['users'] === 'true' ? ROLES.USERS : '';
  if (user) addResource(user, resources);

  const profiles = params['profilesRole'] === 'true' ? ROLES.PROFILES : '';
  if (profiles) addResource(profiles, resources);

  const audit = params['audit'] === 'true' ? ROLES.AUDIT : '';
  if (audit) addResource(audit, resources);
}

/**
 * This function is used to build the settings group
 * it's meant to be called in the ngOnInit lifeCycle hook of the component
 * depending on the params, this will build the settings group
 * if no params are passed, it will build the settings group with all the toggles unchecked
 * @param params The params object from the route
 * @returns Group The settings group
 */
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

    checkAllToggles(settingsGroup);

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

/**
 * This function is used to build the queries group
 * it's meant to be called in the ngOnInit lifeCycle hook of the component
 * depending on the params, this will build the queries group
 * if no params are passed, it will build the queries group with all the toggles unchecked
 * @param params The params object from the route
 * @returns Group The queries group
 */
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

    checkAllToggles(queriesGroup);

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
