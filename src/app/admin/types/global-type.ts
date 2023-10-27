type Sort = {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
};

type Pageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

export type ResponseContent<T> = {
  content: T[];
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
