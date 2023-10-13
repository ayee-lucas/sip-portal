import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { QueryService } from '../../../../query/services/query.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchProfileDialogComponent } from '../search-profile-dialog/search-profile-dialog.component';

type SearchForm = {
  search: FormControl<string | null>;
};

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html'
})
export class SearchProfileComponent implements OnInit {
  searchProfileForm!: FormGroup<SearchForm>;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private queryService: QueryService
  ) {
    const params = this.queryService.getParams();

    if (params['params'].id) {
      this.openDialog();
    }
  }

  ngOnInit() {
    this.searchProfileForm = this.fb.group({
      search: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.searchProfileForm.valid) {
      const params = this.queryService.getParams();

      this.queryService.updateParams({
        ...params['params'],
        id: this.searchProfileForm.value.search
      });
    }

    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(SearchProfileDialogComponent, {
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.searchProfileForm.setValue({ search: '' });
      }

      this.queryService.deleteParam('id');
    });
  }
}
