import AppCard from "./AppCard";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import NoData from "../../components/NoData";

export default function MyApplications() {
  const { data, isPending, isError } = useFetch(
    "applications",
    "/applications/getMyApplications",
  );
  const applications = data?.data?.applications || [];

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center">
        <ActivityIndicator size="lg" />
      </div>
    );

  return (
    <main className="mx-auto mb-8 flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      {applications.length > 0 ? (
        <>
          <h1 className="my-6 text-xl font-bold uppercase tracking-wider md:text-xl">
            List of Applications
          </h1>
          <div className="w-ful flex flex-col gap-5">
            {applications?.map((app) => (
              <AppCard key={app._id} app={app} />
            ))}
          </div>
        </>
      ) : (
        <NoData
          message="You have no applications yet!"
          linkMessage="Explore Sites"
        />
      )}
    </main>
  );
}
