import { ResponseUser } from '../types/response-type-users';

export const operationUserMock: ResponseUser = {
  content: [
    {
      userId: 2,
      names: 'Lopez',
      lastNames: 'Hora',
      email: 'lososo@gmail.com',
      password: 'qEzD9TN3',
      status: false,
      profileId: 7
    },
    {
      userId: 3,
      names: 'aaa',
      lastNames: 'Hoaara',
      email: 'adasd@gmail.com',
      password: 'XMh2rnÑJ',
      status: false,
      profileId: 7
    },
    {
      userId: 1,
      names: 'Hola',
      lastNames: 'updated',
      email: 'lolo@gmail.com',
      password: 'cj351GDC',
      status: true,
      profileId: 7
    }
  ],
  pageable: {
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 20,
    paged: true,
    unpaged: false
  },
  totalElements: 3,
  totalPages: 1,
  last: true,
  size: 20,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true
  },
  numberOfElements: 3,
  first: true,
  empty: false
};
