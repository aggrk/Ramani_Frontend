import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useCartItems from "../hooks/useCartItems";

export default function CartButton() {
  const { cartItems } = useCartItems();

  return (
    <Link
      to="/dashboard/cart"
      className="relative p-2 text-textcolor transition-colors hover:translate-x-1 hover:translate-y-1 hover:transform"
      aria-label="Cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {cartItems?.data.length > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-textcolor text-xs text-bgcolor">
          {cartItems.data.length}
        </span>
      )}
    </Link>
  );
}
