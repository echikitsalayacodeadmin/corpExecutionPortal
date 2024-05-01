import { useState, useEffect } from "react";
import { useAuthFlow } from "./authentication/useAuthFlow";

const useFetch = (url, options = {}) => {
  const { token } = useAuthFlow();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [retryLimit, setRetryLimit] = useState(3);

  const fetchData = async (url, options) => {
    setIsLoading(true);
    try {
      let res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          "X-XSS-Protection": "1; mode=block",
          "Content-Security-Policy": "default-src https:",
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      let json = await res.json();
      setResponse(json);
      setIsLoading(false);
    } catch (err) {
      if (retryCount < retryLimit) {
        setRetryCount(retryCount + 1);
        setIsRetrying(true);
      } else {
        setError(err);
        setIsLoading(false);
        setIsRetrying(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, options, retryCount, retryLimit]);

  useEffect(() => {
    if (isRetrying) {
      fetchData();
    }
  }, [isRetrying]);

  return { response, error, isLoading, isRetrying, retryCount };
};

export default useFetch;
