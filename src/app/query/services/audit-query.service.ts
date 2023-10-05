import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuditQueryService {
  _params!: Params;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getParams() {
    this.route.queryParamMap.subscribe(params => {
      this._params = { ...params };
    });

    return this._params;
  }

  updateParams(params: Params) {
    const currentParams = this.getParams();

    const mergedParams = { ...currentParams['params'], ...params };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: mergedParams,
      queryParamsHandling: 'merge'
    });
  }

  clearParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
}
