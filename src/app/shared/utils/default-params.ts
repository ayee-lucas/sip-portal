import { inject } from '@angular/core';
import { Params } from '@angular/router';
import { QueryService } from 'src/app/query/services/query.service';

export function setDefaultParams(params: Params, sort: string) {
  const paramsValues = params['params'];

  const queryService = inject(QueryService);

  if (!paramsValues.page || !paramsValues.sort || !paramsValues.size) {
    queryService.updateParams({
      page: 0,
      sort: sort,
      size: 10
    });
  }
}
