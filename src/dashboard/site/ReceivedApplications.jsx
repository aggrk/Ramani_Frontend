import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import api from "../../utils/api";
import toast from "react-hot-toast";
import ActivityIndicator from "../../components/ActivityIndicator";
import { CircleCheckIcon } from "lucide-react";
import NoData from "../../components/NoData";
import { motion } from "motion/react";

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
    onSuccess: async () => {
      toast.success("Application approved succesfully");
      await queryClient.invalidateQueries({
        queryKey: ["receivedApplications"],
      });
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
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 pt-4 sm:px-6 lg:px-8">
      {applications.length > 0 ? (
        applications?.map((application) => {
          return (
            <div
              key={application._id}
              className="w-full rounded-lg bg-bgfooter p-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-semibold text-textcolor">
                    {application.siteId.siteTitle}
                  </h3>
                  <p className="pt-2 text-lg text-textcolor">
                    {application.siteId.description}
                  </p>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <div className="grid grid-cols-1 gap-4 text-bgfooter sm:grid-cols-3">
                    <p className="rounded-lg bg-textcolor p-2">
                      Applicant's Name:{" "}
                      <span className="font-bold italic">
                        {application.name}
                      </span>
                    </p>
                    <p className="rounded-lg bg-textcolor p-2">
                      Applicant's Email:{" "}
                      <span className="font-bold italic">
                        {application.email}
                      </span>
                    </p>
                    <p className="rounded-lg bg-textcolor p-2">
                      Applicant's Phone:{" "}
                      <span className="font-bold italic">
                        {application.phone}
                      </span>
                    </p>
                    <p className="rounded-lg bg-textcolor p-2">
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
                <div className="mt-4 flex items-center gap-2 bg-bgcolor p-4">
                  <span className="font-bold text-textcolor">
                    <CircleCheckIcon className="h-5 w-5" />
                  </span>
                  <p className="font-bold text-textcolor">Approved</p>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.9, y: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  onClick={() => mutation.mutate(application._id)}
                  disabled={application.status === "accepted"}
                  className={`mt-3 ${application.status === "accepted" && "cursor-not-allowed"} cursor-pointer rounded-full bg-bgcolor px-8 py-2.5 font-bold text-white`}
                >
                  {mutation.isPending ? (
                    <ActivityIndicator size="xs" className="border-white" />
                  ) : (
                    "Approve"
                  )}
                </motion.button>
              )}
            </div>
          );
        })
      ) : (
        <NoData
          message="You have no applications yet!"
          linkMessage="Go Back to your sites"
          link="/dashboard/sites"
        />
      )}
    </div>
  );
}
