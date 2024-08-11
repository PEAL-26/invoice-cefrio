import { QueryMeta } from "@tanstack/react-query";

export interface ListRequestParams {
  page?: string;
  size?: string;
  q?: string;
}

export interface ListResponseData<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  prev: number | null;
  next: number | null;
}

type QueryKey = ReadonlyArray<unknown>;

export interface QueryPaginationProps<D, R = ListResponseData<D>> {
  queryKey: QueryKey;
  fn: (context?: QueryFn) => Promise<R>;
  disableFetch?: boolean;
}

type FetchDirection = "forward" | "backward";

export type QueryFn<
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = number
> = {
  queryKey: TQueryKey;
  signal: AbortSignal;
  pageParam: TPageParam;
  direction: FetchDirection;
  meta?: QueryMeta;
};

export interface IQueryPaginationResponse<TData> {
  data: TData[];
  isLoading: boolean;
  isError: boolean;
  currentPage?: number;
  totalPages?: number;
  next?: number | null;
  prev?: number | null;
  nextPage?(): void;
  prevPage?(): void;
  setSizePerPage?(size?: number): void;
  refetch?(): Promise<void>;
}
