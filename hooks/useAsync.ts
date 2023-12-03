import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

function useAsync<T, HandlerType extends Function>(
  handler: HandlerType,
  immediate = true
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  async function act(...rest: any[]) {
    setLoading(true);
    try {
      const response = await handler(...rest);
      setData(response);
      return response as T;
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (immediate) {
      act();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    act,
    data,
    error,
    loading,
  };
}

export default useAsync;
