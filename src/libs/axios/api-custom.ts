import { axios } from "./axios";
import { ApiRequestConfig } from "./types";

export async function get<T = any>(
  url: string,
  configs: ApiRequestConfig = {}
) {
  const { convertData = true, ...config } = configs;
  return axios.get<T>(url, config).then((response) => {
    //"status": 200,
    //"statusText": "OK",
    //if(response.status === 400)
    return response.data;
  });
}

export async function post<T = any>(
  url: string,
  data?: any,
  configs: ApiRequestConfig = {}
) {
  const { convertData = true, ...config } = configs;
  return axios.post<T>(url, data, config).then((response) => {
    // if(response.status === 400)
    return response.data;
  });
}

export async function put<T = any>(
  url: string,
  data?: any,
  configs: ApiRequestConfig = {}
) {
  const { convertData = true, ...config } = configs;
  return axios.put<T>(url, data, config).then((response) => {
    // if(response.status === 400)
    return response.data;
  });
}

export async function patch<T = any>(
  url: string,
  data?: any,
  configs: ApiRequestConfig = {}
) {
  const { convertData = true, ...config } = configs;
  return axios.patch<T>(url, data, config).then((response) => {
    // if(response.status === 400)
    return response.data;
  });
}

export async function apiDelete<T = any>(
  url: string,
  configs: ApiRequestConfig = {}
) {
  const { convertData = true, ...config } = configs;
  return axios.delete<T>(url, config).then((response) => {
    // if(response.status === 400)
    return response.data;
  });
}

export const api = { get, post, put, patch, delete: apiDelete };
