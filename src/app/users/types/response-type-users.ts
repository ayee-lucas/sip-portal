export type ResponseUser = ResponseUserSuccess | ResponseUserError | [];

type ResponseUserError = {
  error: {
    errorCode: number;
    errorType: string;
    code: string;
    description: string;
  };
};

type ResponseUserSuccess = {
  content: User[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

type User = {
  userId: number;
  names: string;
  lastNames: string;
  email: string;
  password: string;
  status: boolean;
  profileId: number;
};

type Sort = {
  empty: boolean;
  sorted: boolean;
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
