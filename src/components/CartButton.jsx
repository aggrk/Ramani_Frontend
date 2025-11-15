import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useCartItems from "../hooks/useCartItems";

export default function CartButton() {
  const { cartItems } = useCartItems();

  return (
    <Link
      to="/dashboard/cart"
      className="relative p-2 text-gray-500 transition-colors hover:text-primary"
      aria-label="Cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {cartItems?.data.length > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-accent text-xs text-white">
          {cartItems.data.length}
        </span>
      )}
    </Link>
  );
}
