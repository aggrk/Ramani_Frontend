import NoData from "../../components/NoData";
import useFetch from "../../hooks/useFetch";
import HardwareCard from "../shop/HardwareCard";

export default function MyShops() {
  const { data } = useFetch("myHardware", "/hardware/myHardware");
  const myShops = data?.data?.hardware;

  return (
    <main className="mx-auto mb-8 flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      {myShops?.length > 0 ? (
        <>
          <h1 className="my-6 text-xl font-bold uppercase tracking-wider text-textcolor md:text-xl">
            List of my Shops
          </h1>
          <div className="w-ful flex flex-col gap-5">
            {myShops?.map((hardware) => (
              <HardwareCard key={hardware._id} hardware={hardware} />
            ))}
          </div>
        </>
      ) : (
        <NoData
          message="You have no shops yet!"
          linkMessage="Register a Shop"
          link="/dashboard/register-shop"
        />
      )}
    </main>
  );
}
