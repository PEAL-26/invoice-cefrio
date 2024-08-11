import { AxiosRequestConfig } from 'axios';

interface Custom {
  convertData?: boolean;
}

export interface ApiRequestConfig extends AxiosRequestConfig, Custom {}
