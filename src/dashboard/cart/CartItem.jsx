import { Link } from "react-router-dom";
import { imageUrl } from "../../utils/utils";

export default function CartItem({ item }) {
  const product = item.productId;
  return (
    <div className="flex flex-col justify-between border-t-2 border-gray-300 sm:flex-row">
      <div className="mt-4 flex flex-col gap-5 sm:w-3/4 sm:flex-row">
        <img
          src={`${imageUrl}/products/${product.imageCover}`}
          alt={`${product.name}`}
          className="h-32"
        />
        <div>
          <h3 className="text-lg font-semibold text-textdark">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm/6 italic text-textdark">
            {product.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between gap-5 sm:flex-row sm:self-center">
        <Link className="text-sm text-[#781717] underline md:text-base">
          Remove
        </Link>
        <p className="text-sm font-semibold text-textdark md:text-base">
          {product.pricePerUnit} TZS
        </p>
      </div>
    </div>
  );
}
