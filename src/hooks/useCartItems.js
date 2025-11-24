import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useAuth } from "./useAuth";

export default function useCartItems() {
  const { user } = useAuth();

  const {
    data: cartItems,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["carts", user?.data?._id],
    queryFn: async () => {
      const res = await api.get("/carts/getMyCarts");
      return res.data;
    },
  });

  return { cartItems, isPending, isError };
}
