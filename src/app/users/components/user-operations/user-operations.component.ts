import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectedUserService } from '../../services/selected-user.service';
import { map, Observable, Subscription } from 'rxjs';
import { ResponseUserError, User } from '../../types/response-type-users';
import { AuditQueryService } from '../../../query/services/audit-query.service';
import { Params } from '@angular/router';
import { UserSelectorSearchService } from '../../services/user-selector-search.service';
import { _isUser } from '../../../shared/utils/TypeGuards';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrls: ['./user-operations.component.scss']
})
export class UserOperationsComponent implements OnInit, OnDestroy {
  userSelected$!: Observable<User | null | ResponseUserError>;

  userParamLoaded$!: Observable<User | ResponseUserError>;

  params: Params;
  /** @internal */ isUser = _isUser;
  private userSubscription$!: Subscription;

  constructor(
    private selectedUserService: SelectedUserService,
    private userSearchService: UserSelectorSearchService,
    private queryService: AuditQueryService,
    private translate: TranslateService
  ) {
    this.params = this.queryService.getParams();
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit() {
    const selectParam = this.params['params'].selected;

    if (selectParam && selectParam > 0) {
      this.requestUser();

      this.subscribeToSelectedUser();

      this.userSearchService.init(selectParam);

      return;
    }

    this.userSelected$ = this.selectedUserService.getUserSelected();
  }

  ngOnDestroy() {
    if (this.userSubscription$) {
      this.userSubscription$.unsubscribe();
    }
  }

  requestUser() {
    this.userParamLoaded$ = this.userSearchService.getUser().pipe(
      map(data => {
        if ('loading' in data) {
          console.log('Loading: ', data);
        }

        if ('error' in data) {
          console.log('Error: ', data);
        }

        return data as User | ResponseUserError;
      })
    );
  }

  subscribeToSelectedUser() {
    this.userSubscription$ = this.userParamLoaded$.subscribe(data => {
      if (this.isUser(data)) {
        this.selectedUserService.setUserSelected(data);
      }

      this.userSelected$ = this.selectedUserService.getUserSelected();
    });
  }
}
