import { cache } from 'react';
type Fn<T> = () => Promise<T>;

export const getItemCached = cache(async <T>(fn: Fn<T>) => {
  try {
    const item = await fn();
    return item;
  } catch (error) {
    return null;
  }
});
