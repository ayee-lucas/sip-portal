import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QueryService } from '../../../../query/services/query.service';
import { UserSelectorSearchService } from '../../../services/users/user-selector-search.service';
import { map, Observable } from 'rxjs';
import { ResponseError, User } from '../../../types/response-type-users';
import { _isUser } from '../../../../shared/utils/type-guards';
import { UserSelectorService } from '../../../services/users/user-selector.service';
import { TranslateService } from '@ngx-translate/core';

type SearchUserDialogComponentData = {
  search: string;
};

@Component({
  selector: 'app-search-user-dialog',
  templateUrl: './search-user-dialog.component.html'
})
export class SearchUserDialogComponent implements OnInit {
  user$!: Observable<User | ResponseError>;
  /** @internal */ isUser = _isUser;

  constructor(
    public dialogRef: MatDialogRef<SearchUserDialogComponent>,
    private queryService: QueryService,
    private userSearchService: UserSelectorSearchService,
    private selectedUserService: UserSelectorService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: SearchUserDialogComponentData
  ) {}

  ngOnInit() {
    this.requestUser();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectUser(user: User) {
    this.selectedUserService.setUserSelected(user);
    this.dialogRef.close();
  }

  private requestUser() {
    const idParam = this.queryService.getParams()['params'].id;

    this.user$ = this.userSearchService.getUser().pipe(
      map(data => {
        return data as User | ResponseError;
      })
    );

    this.userSearchService.init(idParam);
  }
}
