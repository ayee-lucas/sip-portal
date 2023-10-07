import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuditQueryService {
  private _params!: Params;

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

  setParams(params: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params
    });
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

  deleteParam(param: string) {
    const currentParams = this.getParams();

    if (!currentParams['params'][param]) return;

    const updatedParams = { ...currentParams['params'] };

    delete updatedParams[param];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams
    });
  }

  clearParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
}
