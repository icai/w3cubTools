import { useRouter } from 'next/router';
import { useMemo } from 'react';
export { useQueryParam };

const transformers = {
  number: {
    fromQuery: (value: string) => Number(value),
    toQuery: (value: number) => String(value),
  },
  string: {
    fromQuery: (value: string) => value,
    toQuery: (value: string) => value,
  },
  boolean: {
    fromQuery: (value: string) => value.toLowerCase() === 'true',
    toQuery: (value: boolean) => (value ? 'true' : 'false'),
  },
};

function useQueryParam<T>({ name, defaultValue }: { name: string; defaultValue: T }) {
  const router = useRouter();
  const type = typeof defaultValue;
  const transformer = transformers[type as keyof typeof transformers] ?? transformers.string;

  const proxy = useMemo(() => {
    const queryParams = router.query;
    const queryValue = queryParams[name] as string | undefined;
    const initialValue = (queryValue !== undefined ? transformer.fromQuery(queryValue) : defaultValue) as T;
    function setQueryValue(newValue: T) {
      // if the new value is the same as the default value, remove the query param
      if (newValue === defaultValue) {
        const { [name]: _, ...newQueryParams } = queryParams;
        router.push({ query: newQueryParams });
        return defaultValue;
      }
      // @ts-ignore
      const newQueryValue = transformer.toQuery(newValue);
      const newQueryParams = { ...queryParams, [name]: newQueryValue };
      router.push({ query: newQueryParams });
      return newQueryValue;
    }
    return [initialValue, setQueryValue];
  }, [router.query, name, defaultValue, transformer]);
  return proxy;
}
