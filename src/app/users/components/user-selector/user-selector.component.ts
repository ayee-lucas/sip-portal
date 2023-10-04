import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators
import { User } from '../../types/response-type-users';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {
  @Input() responseUser!: User[] | undefined;
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]] // Add a required validator
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const searchValue = this.searchForm.value.search;
      console.log('Searching for:', searchValue);
    }
  }

  tracking(index: number, item: User) {
    return item.userId;
  }
}
