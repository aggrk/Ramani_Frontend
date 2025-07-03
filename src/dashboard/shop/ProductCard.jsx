import { ShoppingCart } from "lucide-react";
import { apiUrl, imageUrl } from "../../utils/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function ProductCard({ product }) {
  const [addingToCart, setAddingToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [carts, setCarts] = useState(null);
  const exists = carts?.find((cart) => cart.productId === product._id);

  useEffect(() => {
    const getCarts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${apiUrl}/carts/getMyCarts`, {
          withCredentials: true,
        });
        setCarts(res.data.data);
      } catch (err) {
        console.error(err?.response?.data?.message);
        toast.error("Failed to load cart data");
      } finally {
        setIsLoading(false);
      }
    };

    getCarts();
  }, []);

  const handleAddToCart = async () => {
    if (addingToCart) return; // Prevent multiple clicks
    setAddingToCart(true);
    try {
      const res = await axios.post(
        `${apiUrl}/products/${product._id}/carts`,
        {},
        { withCredentials: true },
      );
      if (res.status === 201) {
        toast.success("Product added to cart");
        // Refetch carts to update the UI
        const cartRes = await axios.get(`${apiUrl}/carts/getMyCarts`, {
          withCredentials: true,
        });
        setCarts(cartRes.data.data);
      }
    } catch (err) {
      console.error(err?.response?.data?.message);
      toast.error(err?.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl bg-[#FFFFFF] p-3 shadow-lg">
        <ActivityIndicator size="md" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[#FFFFFF] p-3 shadow-lg lg:h-48 lg:flex-row">
      <Link
        to={`${product._id}`}
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={`${imageUrl}/products/${product.imageCover}`}
          alt={`Image of ${product.name}`}
          className="h-52 w-full rounded-xl object-cover shadow-lg lg:h-full lg:w-52"
          loading="lazy"
        />
      </Link>
      <div className="flex h-full flex-col gap-1 lg:flex-1">
        <h3 className="font-semibold uppercase tracking-wider text-primary">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm italic">{product.description}</p>
        <div>
          <span className="text-xs font-bold">
            Qty: {product.quantityInStock}
          </span>
        </div>
        <div>
          <span className="text-xs font-bold">{product.pricePerUnit} TZS</span>
        </div>
        {exists ? (
          <Link
            to="/dashboard/cart"
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-md bg-[#811818] py-2 text-base font-bold text-[#FFFFFF] shadow-md transition-colors hover:bg-[#6b1414]"
            aria-label="Go to cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Go to Cart</span>
          </Link>
        ) : (
          <button
            className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#811818] py-2 text-base font-bold text-[#FFFFFF] shadow-md transition-colors hover:bg-[#6b1414] disabled:opacity-50"
            onClick={handleAddToCart}
            disabled={addingToCart}
            aria-label="Add to cart"
          >
            {addingToCart ? (
              <ActivityIndicator size="sm" />
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
