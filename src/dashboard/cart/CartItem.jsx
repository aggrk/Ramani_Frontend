import { Link } from "react-router-dom";
import { imageUrl } from "../../utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function CartItem({ item }) {
  const product = item.productId;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/products/${product._id}/carts/${item._id}`);
    },
    onSuccess: async () => {
      toast.success("Product deleted from cart");
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (err) => {
      console(err.message);
      toast.error(err?.message || "Failed to delete item from cart");
    },
  });

  const handleDeleteFromCart = () => {
    mutation.mutate();
  };

  return (
    <div className="mr-4 flex flex-col justify-between border-t-2 border-textcolor/20 sm:flex-row">
      <div className="mt-4 flex flex-col gap-5 sm:w-3/4 sm:flex-row">
        <img
          src={`${imageUrl}/products/${product?.imageCover}`}
          alt={`${product?.name}`}
          className="h-32"
        />
        <div>
          <h3 className="text-lg font-semibold text-textcolor">
            {product?.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm/6 italic text-textcolor">
            {product?.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between gap-5 sm:flex-row sm:self-center">
        <Link
          className="text-sm text-textsecondary underline md:text-base"
          onClick={handleDeleteFromCart}
        >
          Remove
        </Link>
        <p className="text-sm font-semibold text-textcolor md:text-base">
          {product?.pricePerUnit} TZS
        </p>
      </div>
    </div>
  );
}
