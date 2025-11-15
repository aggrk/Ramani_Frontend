import NoData from "../../components/NoData";
import useFetch from "../../hooks/useFetch";

export default function RejectedApplications() {
  const { data } = useFetch("applications", "applications/getMyApplications");
  const applications = data?.data?.applications || [];

  const rejectedApplications = applications.filter(
    (app) => app.status === "rejected",
  );

  return (
    <main className="mx-auto mb-8 flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      {applications.length > 0 ? (
        <>
          <h1 className="my-6 text-xl font-bold uppercase tracking-wider md:text-xl">
            List of Rejected Applications
          </h1>
          <div className="w-ful flex flex-col gap-5">
            {rejectedApplications?.map((app) => (
              <AppCard key={app._id} app={app} />
            ))}
          </div>
        </>
      ) : (
        <NoData
          message="You have no rejected applications yet!"
          linkMessage="Explore Sites"
        />
      )}
    </main>
  );
}
