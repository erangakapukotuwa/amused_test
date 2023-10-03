import axios, { CreateAxiosDefaults } from 'axios';

import { COCKTAIL_API } from '../configs';
import { errorMsg } from '../utils/constants';

const getApiError = (error: any, defaultMessage?: string) => {
  if (typeof error === 'string') {
    return error;
  }
  if (error?.msg) {
    return error.msg;
  }
  if (error?.response?.data) {
    const { data } = error?.response;
    if (typeof data === 'string') {
      return data;
    }
    if (typeof data?.message === 'string') {
      return data?.message;
    }
    if (typeof data?.error === 'string') {
      return data?.error;
    }
  }

  return defaultMessage || errorMsg.SOMETHING_WRONG;
};

const axiosApi = axios.create({
  baseURL: COCKTAIL_API,
} as CreateAxiosDefaults);

axiosApi.interceptors.response.use(undefined, (error) =>
  Promise.reject({
    msg: getApiError(error),
    HttpStatusCode: error.response.status || 500,
  }),
);

export { axiosApi, getApiError };
