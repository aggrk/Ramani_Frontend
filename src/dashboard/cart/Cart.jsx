import CheckoutProcessing from "../../components/CheckoutProcessing";
import NoData from "../../components/NoData";
import useCartItems from "../../hooks/useCartItems";
import CartItem from "./CartItem";

export default function Cart() {
  const { cartItems, isPending, isError } = useCartItems();
  console.log(cartItems);

  const total = cartItems?.data?.reduce(
    (acc, item) => acc + item.productId.pricePerUnit,
    0,
  );

  console.log(total);
  return (
    <main className="mx-auto mb-8 flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      {cartItems?.data?.length ? (
        <>
          <h1 className="my-6 text-xl font-bold uppercase tracking-wider md:text-xl">
            Shopping Cart
          </h1>
          <h3 className="text-lg font-bold italic">
            {cartItems.data?.length} products in Cart
          </h3>
          <div className="flex w-full flex-col justify-between md:flex-row">
            <div className="flex flex-col gap-5 md:w-3/4">
              {cartItems.data.map((item) => {
                return (
                  <div key={item._id} className="flex">
                    <CartItem item={item} />
                  </div>
                );
              })}
            </div>
            <CheckoutProcessing total={total} />
          </div>
        </>
      ) : (
        <NoData
          message="No Products in cart"
          linkMessage="Go to Dashboard"
          link=".."
        />
      )}
    </main>
  );
}
