import axios from "axios";
import { useEffect, useState } from "react";
import AppCard from "./AppCard";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getApplications = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${apiUrl}/applications/getMyApplications`,
          {
            withCredentials: true,
          },
        );

        setApplications(res?.data?.data?.applications);
      } catch (err) {
        console.log(`Error: ${err.response?.data?.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getApplications();
  }, []);

  const handleDeleteApplication = async (id) => {
    try {
      setApplications(applications.filter((app) => app._id !== id) || []);
      await axios.delete(`${apiUrl}/applications/${id}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <ActivityIndicator size="lg" />
      </div>
    );

  return (
    <main className="mx-auto mb-8 flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      {applications.length ? (
        <>
          <h1 className="my-6 text-xl font-bold uppercase tracking-wider md:text-xl">
            List of Applications
          </h1>
          <div className="w-ful flex flex-col gap-5">
            {applications?.map((app) => (
              <AppCard
                key={app._id}
                app={app}
                handleDeleteApplication={handleDeleteApplication}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-12 self-center">
          <p className="text-xl text-[#781717] lg:text-2xl">
            You have no applications yet!{" "}
            <Link
              to="/dashboard/sites"
              className="font-semibold italic underline"
            >
              Explore Sites
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}
