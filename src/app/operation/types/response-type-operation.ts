export type ResponseOperation = {
  content: ResponseOperationUser[];
  totalElements: number;
  totalPages: number;
};

export type ResponseOperationUser = {
  id: number;
  email: string;
  name: string;
  status: boolean;
  profile: {
    id: number;
    name: string;
    description: string;
    providerProfile: boolean;
    status: boolean;
  };
};
