import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSetSearchParams } from "../use-search-params";
import {
  IQueryPaginationResponse,
  QueryFn,
  QueryPaginationProps,
} from "./types";

export function useQueryPagination<T>(
  props: QueryPaginationProps<T>
): IQueryPaginationResponse<T> {
  const { queryKey, fn, disableFetch = false, ...rest } = props;
  const { setParams } = useSetSearchParams();
  const [index, setIndex] = useState(0);

  const queryFn = async (props?: QueryFn) => {
    const page = Number(props?.pageParam || 1);
    setIndex(page - 1);
    if (disableFetch) return;
    return await fn(props);
  };

  const {
    data: response,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isError,
    refetch,
  } = useInfiniteQuery({
    ...rest,
    queryFn,
    queryKey: queryKey.filter((value) => value),
    initialPageParam: 1,
    getNextPageParam: (data) => data?.next || undefined,
    getPreviousPageParam: (data) => data?.prev || undefined,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    select: (data) => data?.pages?.[index],
  });

  const nextPage = async () => {
    if (isFetching) return;
    if (hasNextPage) {
      setParams({ name: "page", value: String(response?.next) });
    }
  };

  const prevPage = async () => {
    if (isFetching) return;
    if (hasPreviousPage) {
      setParams({ name: "page", value: String(response?.prev) });
    }
  };

  const setSizePerPage = (size?: number) => {
    if (isFetching) return;
    setParams([
      { name: "page", value: size ? "1" : undefined },
      { name: "size", value: size ? String(size) : undefined },
    ]);
  };

  return {
    data: response?.data || [],
    isLoading:
      isLoading || isFetching || isFetchingNextPage || isFetchingPreviousPage,
    isError,
    currentPage: response?.currentPage,
    totalPages: response?.totalPages,
    next: response?.next,
    prev: response?.prev,
    nextPage,
    prevPage,
    setSizePerPage,
    refetch: async () => {
      await refetch();
    },
  };
}
