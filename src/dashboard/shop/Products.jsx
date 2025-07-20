import { useParams } from "react-router-dom";
import ActivityIndicator from "../../components/ActivityIndicator";
import NoData from "../../components/NoData";
import ProductCard from "./ProductCard";
import useFetch from "../../hooks/useFetch";

export default function Products() {
  const { id } = useParams();
  const { data, isPending, isError } = useFetch(
    "products",
    `/hardware/${id}/products`,
  );
  const products = data?.data?.products;

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center">
        <ActivityIndicator size="lg" />
      </div>
    );

  return (
    <main className="mx-auto mb-8 flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      {products.length ? (
        <>
          <h1 className="my-6 text-xl font-bold uppercase tracking-wider md:text-xl">
            List of Products
          </h1>
          <div className="flex w-full flex-col gap-5 lg:grid lg:grid-cols-2">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <NoData
          message="No Products for this hardware"
          linkMessage="Go to hardware"
          link="/dashboard/hardware"
        />
      )}
    </main>
  );
}
