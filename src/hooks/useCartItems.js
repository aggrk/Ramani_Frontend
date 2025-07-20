import useFetch from "./useFetch";

export default function useCartItems() {
  const {
    data: cartItems,
    isPending,
    isError,
  } = useFetch("carts", "/carts/getMyCarts");

  return { cartItems, isPending, isError };
}
