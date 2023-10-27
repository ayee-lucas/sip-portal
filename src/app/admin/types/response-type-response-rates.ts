import { ResponseError, ResponseLoading } from './response-type-users';
import { ResponseContent } from './global-type';

export type ResponseRates =
  | ResponseError
  | ResponseLoading
  | ResponseRatesSuccess;

export type Rates = {
  id: number;
  name: string;
  day: string;
  start_time: Date;
  end_time: Date;
  price: number;
  status: boolean;
  idParking: number;
};

export type ResponseRatesSuccess = ResponseContent<Rates>;
