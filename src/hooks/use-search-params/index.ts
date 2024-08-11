import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface GetSearchParamsProps {
  params: string | string[];
}

export function useGetSearchParams(props: GetSearchParamsProps) {
  const { params } = props;
  const searchParams = useSearchParams();

  let result = [];
  if (Array.isArray(params)) {
    for (const param of params) {
      const value = searchParams.get(param);
      result.push(value || undefined);
    }
  } else {
    const value = searchParams.get(params);
    result.push(value || undefined);
  }

  return [...result];
}

type Param = {
  name: string;
  value?: string;
};

export function useSetSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setParams = (params: Param | Param[]) => {
    const urlSearchParams = new URLSearchParams(searchParams);

    if (Array.isArray(params)) {
      for (const param of params) {
        const { name, value } = param;
        if (value) {
          urlSearchParams.set(name, value);
        } else {
          urlSearchParams.delete(name);
        }
      }
    } else {
      const { name, value } = params;
      if (value) {
        urlSearchParams.set(name, value);
      } else {
        urlSearchParams.delete(name);
      }
    }

    replace(`${pathname}?${urlSearchParams.toString()}`);
  };

  return { setParams };
}
