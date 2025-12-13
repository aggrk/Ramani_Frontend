import {
  Calendar,
  CircleCheck,
  CircleDotDashed,
  CircleX,
  HandCoins,
  MapPin,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import { formatDate } from "../../utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { Link } from "react-router-dom";

export default function AppCard({ app }) {
  const application = app.siteId;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => api.delete(`/applications/${app._id}`),
    onSuccess: async () => {
      toast.success("Application deleted succesfully!");
      await queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-bgfooter p-5 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="w-full border-b border-textcolor/20 pb-2">
        <h3 className="text-lg font-bold uppercase tracking-wide text-textcolor">
          {application.siteTitle}
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-md bg-textcolor px-3 py-2 text-sm shadow-sm">
          <MapPin className="h-5 w-5 text-primary" />
          <p className="text-bgfooter">{application.siteAddress.region}</p>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-textcolor px-3 py-2 text-sm shadow-sm">
          <Calendar className="h-5 w-5 text-primary" />
          <p className="text-bgfooter">
            {formatDate(application.dates.start)} -{" "}
            {formatDate(application.dates.end)}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-textcolor px-3 py-2 text-sm shadow-sm">
          {app.status === "accepted" && (
            <CircleCheck className="h-5 w-5 text-primary" />
          )}
          {app.status === "pending" && (
            <CircleDotDashed className="h-5 w-5 text-primary" />
          )}
          {app.status === "rejected" && (
            <CircleX className="h-5 w-5 text-primary" />
          )}
          <p className="capitalize text-bgfooter">{app.status}</p>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-textcolor px-3 py-2 text-sm shadow-sm">
          <HandCoins className="h-5 w-5 text-primary" />
          <p className="text-bgfooter">{application.paymentPerDay}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm italic leading-6 tracking-wide text-textcolor">
        {application.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <Link
          to={`${app._id}`}
          className="text-sm font-bold text-textfooter underline hover:opacity-80"
        >
          View Details
        </Link>

        <button
          className="text-md rounded-full bg-textfooter px-6 py-1 font-semibold text-bgfooter shadow-sm transition-all hover:border hover:border-textcolor hover:bg-bgfooter hover:text-textcolor hover:shadow-md"
          onClick={() => mutation.mutate()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
