import axios from "axios";
import { useEffect, useState } from "react";
import ActivityIndicator from "../../components/ActivityIndicator";
import HardwareCard from "./HardwareCard";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Hardware() {
  const [hardware, setHardware] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(hardware);

  useEffect(() => {
    const getHardware = async () => {
      try {
        setIsLoading(true);
        const res = await axios(`${apiUrl}/hardware`, {
          withCredentials: true,
        });
        setHardware(res.data.data.hardware);
      } catch (err) {
        console.log(err?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getHardware();
  }, []);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <ActivityIndicator size="lg" />
      </div>
    );

  return (
    <main className="mx-auto mb-8 flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      {hardware.length ? (
        <>
          <h1 className="my-6 text-xl font-bold uppercase tracking-wider md:text-xl">
            List of Hardware
          </h1>
          <div className="w-ful flex flex-col gap-5">
            {hardware?.map((hardware) => (
              <HardwareCard key={hardware._id} handware={hardware} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-12 self-center">
          <p className="text-xl text-[#781717] lg:text-2xl">
            No Hardware yet!{" "}
            <Link to="/dashboard" className="font-semibold italic underline">
              Back to Dashboard
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}
