import { useQueryClient } from '@tanstack/react-query';

export function useQueryGetDataCached() {
  const queryClient = useQueryClient();

  const getDataCached = <T = any>(id: string, queryKey: string[]): T | null => {
    if (!id) return null;

    const queryCached = queryClient.getQueryCache();
    const result = queryCached.findAll({ queryKey });
    const pages = result.map((data: any) => data.state.data?.pages?.map((page: any) => page));

    let response = null;
    for (let [page] of pages || []) {
      response = page.data.find((page: any) => page.id === id);
      if (response) {
        break;
      }
    }

    return response as T;
  };

  return { getDataCached };
}
