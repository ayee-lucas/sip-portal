import { ResponseError, ResponseLoading } from './response-type-users';

export type ResponseProfile =
  | ResponseProfileSuccess
  | ResponseError
  | ResponseLoading;

export type Profile = {
  profileId: number;
  name: string;
  description_profile: string;
  status: boolean;
};

type Sort = {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
};

type Pageable = {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type ResponseProfileSuccess = {
  content: Profile[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: Sort;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
};
