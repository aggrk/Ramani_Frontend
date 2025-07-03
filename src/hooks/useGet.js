import axios from "axios";
import { useEffect, useState } from "react";

export default function useGet(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(url, {
          withCredentials: true,
          signal: controller.signal,
        });
        setData(res.data.data);
      } catch (err) {
        console.log(err?.response?.data?.message);
        setError(err?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}
