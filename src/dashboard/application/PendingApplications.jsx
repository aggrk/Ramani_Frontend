import NoData from "../../components/NoData";
import useFetch from "../../hooks/useFetch";

export default function PendingApplications() {
  const { data } = useFetch("applications", "applications/getMyApplications");
  const applications = data?.data?.applications || [];

  const pendingApplications = applications.filter(
    (app) => app.status === "pending",
  );

  return (
    <main className="mx-auto mb-8 flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      {applications.length > 0 ? (
        <>
          <h1 className="my-6 text-xl font-bold uppercase tracking-wider md:text-xl">
            List of Pending Applications
          </h1>
          <div className="w-ful flex flex-col gap-5">
            {pendingApplications?.map((app) => (
              <AppCard key={app._id} app={app} />
            ))}
          </div>
        </>
      ) : (
        <NoData
          message="You have no pending applications yet!"
          linkMessage="Explore Sites"
        />
      )}
    </main>
  );
}
