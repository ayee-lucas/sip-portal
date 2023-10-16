import { FormArray, FormControl } from '@angular/forms';

export type ProfileForm = {
  name: FormControl<string | null>;
  description_profile: FormControl<string | null>;
  status: FormControl<boolean | null>;
  permissions: FormArray;
};

export type Group = {
  groupChecked: boolean;
  children: Children[];
};

export type Children = {
  id: string;
  label: string;
  checked: boolean;
};
