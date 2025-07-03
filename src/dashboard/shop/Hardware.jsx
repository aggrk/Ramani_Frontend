import axios from "axios";
import { useEffect, useState } from "react";
import ActivityIndicator from "../../components/ActivityIndicator";
import HardwareCard from "./HardwareCard";
import { Link } from "react-router-dom";
import useGet from "../../hooks/useGet";
import { apiUrl } from "../../utils/utils";
import NoData from "../../components/NoData";

export default function Hardware() {
  const { data, isLoading } = useGet(`${apiUrl}/hardware`);
  const hardware = data?.hardware || [];

  if (isLoading || data === null)
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
              <HardwareCard key={hardware._id} hardware={hardware} />
            ))}
          </div>
        </>
      ) : (
        <NoData
          message="No Hardware yet!"
          linkMessage="Back to Dashboard"
          link="/dashboard"
        />
      )}
    </main>
  );
}
