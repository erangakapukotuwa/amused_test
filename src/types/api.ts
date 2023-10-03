import { UseQueryOptions } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

export interface ApiServiceErr {
  msg: string;
  status: HttpStatusCode;
}

export type QueryOptions<Response, TVariables = unknown> = UseQueryOptions<
  Response,
  ApiServiceErr,
  TVariables,
  any[]
>;

export type QueryOpt<Response> = UseQueryOptions<
  Response,
  ApiServiceErr,
  any,
  any
>;
