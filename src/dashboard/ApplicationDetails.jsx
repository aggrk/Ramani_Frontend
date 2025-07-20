import {
  Calendar,
  CircleCheck,
  CircleDotDashed,
  CircleX,
  HandCoins,
  MapPin,
} from "lucide-react";
export default function ApplicationDetails() {
  return (
    <>
      <div className="bg-neutral shadow-sm text-sm rounded-lg p-2 gap-2 flex items-center">
        <span className="font-bold text-[#781717] opacity-90">
          <MapPin className="w-5 h-5" />
        </span>
        <p className="text-[#000000]">{application.siteAddress.region}</p>
      </div>
      <div className="bg-neutral shadow-sm text-sm rounded-lg p-2 gap-2 flex items-center">
        <span className="font-bold text-[#781717] opacity-85">
          <Calendar className="w-5 h-5" />
        </span>
        <p className="text-[#000000]">
          {new Date(application.dates.start).toLocaleDateString()} -{" "}
          {new Date(application.dates.end).toLocaleDateString()}
        </p>
      </div>
      <div className="bg-neutral shadow-sm text-sm rounded-lg p-2 gap-2 flex items-center">
        <span className="font-bold text-[#781717] opacity-85">
          {app.status === "accepted" && <CircleCheck className="w-5 h-5" />}{" "}
          {app.status === "pending" && <CircleDotDashed className="w-5 h-5" />}
          {app.status === "rejected" && <CircleX className="w-5 h-5" />}
        </span>
        <p className="text-[#000000]">{app.status}</p>
      </div>
      <div className="bg-neutral shadow-sm text-sm rounded-lg p-2 gap-2 flex items-center">
        <span className="font-bold text-[#781717] opacity-85">
          <HandCoins className="w-5 h-5" />
        </span>
        <p className="text-[#000000]">{application.paymentPerDay}</p>
      </div>
    </>
  );
}
