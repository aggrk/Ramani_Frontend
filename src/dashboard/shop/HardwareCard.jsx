import { CircleCheck, MapPin } from "lucide-react";

export default function HardwareCard({ hardware }) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-accent bg-white p-4 shadow-lg">
      <div className="w-full border-b border-gray-400 border-opacity-30">
        <h3 className="text-md mb-2 font-bold uppercase tracking-wide text-[#781717]">
          {hardware.name}
        </h3>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-sm shadow-sm">
          <span className="font-bold text-[#781717] opacity-90">
            <MapPin className="h-5 w-5" />
          </span>
          <p className="text-[#000000]">
            {hardware.address.street},{hardware.address.region}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-sm shadow-sm">
          <span className="font-bold text-[#781717] opacity-85">
            <CircleCheck className="h-5 w-5" />
          </span>
          <p className="text-[#000000]">{hardware.status}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-sm shadow-sm">
          <span className="font-bold text-[#781717] opacity-85">
            <HandCoins className="h-5 w-5" />
          </span>
          <p className="text-[#000000]">{hardware.paymentPerDay}</p>
        </div>
      </div>

      <div>
        <p className="md:text-md line-clamp-2 text-sm italic leading-6 tracking-wide text-[#33401C]">
          {application.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Link
          to=""
          className="hover:text-md text-sm font-bold text-[#33401C] underline hover:opacity-80"
          onClick={handleOpenModal}
        >
          View Details
        </Link>
        <button
          className="text-md rounded-full border border-red-600 bg-white px-6 py-1 font-semibold text-[#811818] hover:border-none hover:bg-warning hover:text-white hover:shadow-lg"
          onClick={() => handleDeleteApplication(app._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
