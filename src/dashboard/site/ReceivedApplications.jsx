import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import api from "../../utils/api";
import toast from "react-hot-toast";
import ActivityIndicator from "../../components/ActivityIndicator";
import { CircleCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReceivedApplications() {
  const { data, isPending } = useFetch(
    "receivedApplications",
    "applications/my",
  );
  const applications = data?.data?.applications;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      await api.patch(`/applications/approve/${id}`);
    },
    onSuccess: () => {
      toast.success("Application approved succesfully");
      queryClient.invalidateQueries(["receivedApplications"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.message || "Failed to add site.");
    },
  });

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center">
        <ActivityIndicator size="lg" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl space-y-6 pt-4">
      {applications.length > 0 ? (
        applications?.map((application) => {
          return (
            <div
              key={application._id}
              className="w-full rounded-lg bg-white p-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-semibold">
                    {application.siteId.siteTitle}
                  </h3>
                  <p className="pt-2 text-lg">
                    {application.siteId.description}
                  </p>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <div className="grid grid-cols-1 gap-4 text-gray-700 sm:grid-cols-3">
                    <p className="rounded-md bg-neutral p-2">
                      Applicant's Name:{" "}
                      <span className="font-bold italic">
                        {application.name}
                      </span>
                    </p>
                    <p className="rounded-md bg-neutral p-2">
                      Applicant's Email:{" "}
                      <span className="font-bold italic">
                        {application.email}
                      </span>
                    </p>
                    <p className="rounded-md bg-neutral p-2">
                      Applicant's Phone:{" "}
                      <span className="font-bold italic">
                        {application.phone}
                      </span>
                    </p>
                    <p className="rounded-md bg-neutral p-2">
                      Status:{" "}
                      <span className="font-bold italic">
                        {application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {application.status === "accepted" ? (
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-bold text-green-700">
                    <CircleCheckIcon className="h-5 w-5" />
                  </span>
                  <p className="font-bold text-textdark">Approved</p>
                </div>
              ) : (
                <button
                  onClick={() => mutation.mutate(application._id)}
                  disabled={application.status === "accepted"}
                  className={`mt-3 ${application.status === "accepted" && "cursor-not-allowed"} cursor-pointer rounded-full bg-[#B22222] px-8 py-2.5 font-bold text-white transition hover:bg-[#8a1a1a]`}
                >
                  {mutation.isPending ? (
                    <ActivityIndicator size="xs" className="border-white" />
                  ) : (
                    "Approve"
                  )}
                </button>
              )}
            </div>
          );
        })
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
    </div>
  );
}
