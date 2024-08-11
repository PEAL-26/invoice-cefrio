import { ListRequestParams, ListResponseData } from "@/types";
import { api } from "./api-custom";
import { ApiRequestConfig } from "./types";

export class Crud {
  constructor(private mainRoute: string) {}

  async create<Request = any, Response = any>(
    request: Request,
    config?: ApiRequestConfig
  ) {
    return api.post<Response>(`${this.mainRoute}`, request, config);
  }

  async update<Request = any, Response = any>(
    request: Request,
    id: string,
    config?: ApiRequestConfig
  ) {
    return api.put<Response>(`${this.mainRoute}/${id}`, request, config);
  }

  async list<TData, Params extends ListRequestParams = {}>(
    params?: Params,
    configs?: ApiRequestConfig
  ): Promise<ListResponseData<TData>> {
    const { signal, ...rest } = configs || {};
    return api.get<ListResponseData<TData>>(`${this.mainRoute}`, {
      params,
      signal,
      ...rest,
    });
  }

  async getById<TData>(id: string, config?: ApiRequestConfig) {
    return api.get<TData>(`${this.mainRoute}/${id}`, config);
  }

  async delete(id: string, config?: ApiRequestConfig) {
    return api.delete(`${this.mainRoute}/${id}`, config);
  }
}

interface CrudProps {
  route: string;
}

export function crud<
  TCreate = any,
  TUpdate = any,
  TDataList = any,
  TParams extends ListRequestParams = any,
  TDataById = any
>(props: CrudProps) {
  const { route } = props;

  const op = new Crud(route);

  return {
    create: (data: TCreate, config?: ApiRequestConfig) =>
      op.create<TCreate>(data, config),
    update: (data: TUpdate, id: string, config?: ApiRequestConfig) =>
      op.update<TUpdate>(data, id, config),
    list: (Params?: TParams, configs?: ApiRequestConfig) =>
      op.list<TDataList, TParams>(Params, configs),
    getById: (id: string, config?: ApiRequestConfig) =>
      op.getById<TDataById>(id, config),
    delete: (id: string, config?: ApiRequestConfig) => op.delete(id, config),
  };
}
