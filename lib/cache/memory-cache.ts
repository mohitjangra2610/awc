type CacheEntry<T> = {
  data: T;
  expiry: number;
};

const cacheStore = new Map<string, CacheEntry<unknown>>();

export async function getMemoryCachedData<T>(
  key: string,
  ttlInSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const cached = cacheStore.get(key) as CacheEntry<T> | undefined;

  if (cached && now < cached.expiry) {
    return cached.data;
  }

  const data = await fetcher();

  cacheStore.set(key, {
    data,
    expiry: now + ttlInSeconds * 1000,
  });

  return data;
}

export function clearMemoryCache(key?: string): void {
  if (key) {
    cacheStore.delete(key);
    return;
  }

  cacheStore.clear();
}