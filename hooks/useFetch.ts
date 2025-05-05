////////////////////////

import { useEffect, useState } from "react";

export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autofetch = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (autofetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchFunction();
      setData(results);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("An error occurred"));
    }
    setLoading(false);
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return { data, loading, error, reset, refetch: fetchData };
};
