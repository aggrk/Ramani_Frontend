import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export default function useFetch(queryKey, url, params = {}, options = {}) {
  const fetchData = async () => {
    const res = await api.get(`${url}`, { params });
    return res.data;
  };
  return useQuery({
    queryKey: [queryKey],
    queryFn: fetchData,
    ...options,
  });
}
