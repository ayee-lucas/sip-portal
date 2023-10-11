import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

type SearchForm = {
  id: FormControl<string | null>;
};

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html'
})
export class SearchProfileComponent implements OnInit {
  searchProfileForm!: FormGroup<SearchForm>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchProfileForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.searchProfileForm.value);
  }
}
