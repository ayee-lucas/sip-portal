import { ResponseContent } from './global-type';
import { ResponseError, ResponseLoading } from './response-type-users';

export type ResponseParking =
  | ResponseParkingSuccess
  | ResponseError
  | ResponseLoading;

export type ResponseParkingSuccess = ResponseContent<Parking>;

export type Parking = {
  parkingId: number;
  code: number;
  name: string;
  address: string;
  phone: string;
  manager: string;
  status: boolean;
};
