export type User = {
  identifier: string;
  date: string;
  entity: string;
  user: string;
  operation: string;
  id: number;
  content: User[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
};

export const mockUsers = {
  content: [
    {
      identifier: '133',
      date: '2022-10-25T16:31:35Z',
      entity: 'costs',
      user: 'avasquez@is4tech.com',
      operation: 'I',
      id: 3130
    },
    {
      identifier: '132',
      date: '2022-10-20T18:06:07Z',
      entity: 'costs',
      user: 'aisabelv77@gmail.com',
      operation: 'I',
      id: 3002
    },
    {
      identifier: '131',
      date: '2022-10-20T16:56:48Z',
      entity: 'costs',
      user: 'aisabelv77@gmail.com',
      operation: 'I',
      id: 2928
    },
    {
      identifier: '130',
      date: '2022-10-18T17:43:00Z',
      entity: 'costs',
      user: 'ecoronado@is4tech.com',
      operation: 'I',
      id: 2597
    },
    {
      identifier: '128',
      date: '2022-10-18T17:42:39Z',
      entity: 'costs',
      user: 'ecoronado@is4tech.com',
      operation: 'I',
      id: 2595
    },
    {
      identifier: '127',
      date: '2022-10-18T17:42:28Z',
      entity: 'costs',
      user: 'ecoronado@is4tech.com',
      operation: 'I',
      id: 2594
    },
    {
      identifier: '126',
      date: '2022-10-18T17:42:18Z',
      entity: 'costs',
      user: 'ecoronado@is4tech.com',
      operation: 'I',
      id: 2592
    },
    {
      identifier: '125',
      date: '2022-10-18T17:42:10Z',
      entity: 'costs',
      user: 'ecoronado@is4tech.com',
      operation: 'I',
      id: 2591
    },
    {
      identifier: '124',
      date: '2022-10-18T17:42:01Z',
      entity: 'costs',
      user: 'ecoronado@is4tech.com',
      operation: 'I',
      id: 2590
    },
    {
      identifier: '123',
      date: '2022-10-18T17:39:36Z',
      entity: 'costs',
      user: 'ecoronado@is4tech.com',
      operation: 'I',
      id: 2589
    },
    // 20 more users added below
    {
      identifier: '153',
      date: '2022-10-30T14:25:10Z',
      entity: 'costs',
      user: 'newuser1@example.com',
      operation: 'I',
      id: 3150
    },
    {
      identifier: '152',
      date: '2022-10-31T12:10:45Z',
      entity: 'costs',
      user: 'newuser2@example.com',
      operation: 'I',
      id: 3160
    },
    {
      identifier: '151',
      date: '2022-11-01T09:45:22Z',
      entity: 'costs',
      user: 'newuser3@example.com',
      operation: 'I',
      id: 3170
    },
    {
      identifier: '150',
      date: '2022-11-02T08:20:05Z',
      entity: 'costs',
      user: 'newuser4@example.com',
      operation: 'I',
      id: 3180
    },
    {
      identifier: '149',
      date: '2022-11-03T07:05:30Z',
      entity: 'costs',
      user: 'newuser5@example.com',
      operation: 'I',
      id: 3190
    },
    {
      identifier: '148',
      date: '2022-11-04T06:00:12Z',
      entity: 'costs',
      user: 'newuser6@example.com',
      operation: 'I',
      id: 3200
    },
    {
      identifier: '147',
      date: '2022-11-05T05:15:28Z',
      entity: 'costs',
      user: 'newuser7@example.com',
      operation: 'I',
      id: 3210
    },
    {
      identifier: '146',
      date: '2022-11-06T04:30:18Z',
      entity: 'costs',
      user: 'newuser8@example.com',
      operation: 'I',
      id: 3220
    },
    {
      identifier: '145',
      date: '2022-11-07T03:45:42Z',
      entity: 'costs',
      user: 'newuser9@example.com',
      operation: 'I',
      id: 3230
    },
    {
      identifier: '144',
      date: '2022-11-08T03:00:57Z',
      entity: 'costs',
      user: 'newuser10@example.com',
      operation: 'I',
      id: 3240
    },
    {
      identifier: '143',
      date: '2022-11-09T02:15:22Z',
      entity: 'costs',
      user: 'newuser11@example.com',
      operation: 'I',
      id: 3250
    },
    {
      identifier: '142',
      date: '2022-11-10T01:30:10Z',
      entity: 'costs',
      user: 'newuser12@example.com',
      operation: 'I',
      id: 3260
    },
    {
      identifier: '141',
      date: '2022-11-11T00:45:34Z',
      entity: 'costs',
      user: 'newuser13@example.com',
      operation: 'I',
      id: 3270
    },
    {
      identifier: '140',
      date: '2022-11-12T00:00:51Z',
      entity: 'costs',
      user: 'newuser14@example.com',
      operation: 'I',
      id: 3280
    },
    {
      identifier: '139',
      date: '2022-11-13T00:00:51Z',
      entity: 'costs',
      user: 'newuser15@example.com',
      operation: 'I',
      id: 3290
    },
    {
      identifier: '138',
      date: '2022-11-14T00:00:51Z',
      entity: 'costs',
      user: 'newuser16@example.com',
      operation: 'I',
      id: 3300
    },
    {
      identifier: '137',
      date: '2022-11-15T00:00:51Z',
      entity: 'costs',
      user: 'newuser17@example.com',
      operation: 'I',
      id: 3310
    },
    {
      identifier: '136',
      date: '2022-11-16T00:00:51Z',
      entity: 'costs',
      user: 'newuser18@example.com',
      operation: 'I',
      id: 3320
    },
    {
      identifier: '135',
      date: '2022-11-17T00:00:51Z',
      entity: 'costs',
      user: 'newuser19@example.com',
      operation: 'I',
      id: 3330
    },
    {
      identifier: '134',
      date: '2022-11-18T00:00:51Z',
      entity: 'costs',
      user: 'newuser20@example.com',
      operation: 'I',
      id: 3340
    }
  ],
  page: 0,
  totalElements: 30,
  totalPages: 2
};
