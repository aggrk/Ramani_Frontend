import { CircleCheck, HandCoins, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function HardwareCard({ hardware }) {
  const { user } = useAuth();
  const { role } = user.data;
  const coord = hardware.coordinates.coordinates;
  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${coord[0]},${coord[1]}`,
    );
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-bgfooter p-4 shadow-lg">
      <div className="w-full border-b border-textcolor border-opacity-20">
        <h3 className="text-md mb-2 font-bold uppercase tracking-wide text-textcolor">
          {hardware.name}
        </h3>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-textcolor p-2 text-sm shadow-sm">
          <span className="font-bold text-primary opacity-90">
            <MapPin className="h-5 w-5" />
          </span>
          <p className="text-bgfooter">
            {hardware.address.street}, {hardware.address.region}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-textcolor p-2 text-sm shadow-sm">
          <span className="font-bold text-primary opacity-85">
            <Phone className="h-5 w-5" />
          </span>
          <p className="text-bgfooter">{hardware.phone}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-textcolor p-2 text-sm shadow-sm">
          <span className="font-bold text-primary opacity-85">
            <CircleCheck className="h-5 w-5" />
          </span>
          <p className="text-bgfooter">
            {hardware.status.charAt(0).toUpperCase() + hardware.status.slice(1)}
          </p>
        </div>
      </div>

      <div>
        <p className="md:text-md line-clamp-2 text-sm italic leading-6 tracking-wide text-textcolor">
          {hardware.description}
        </p>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <Link
          to={`/dashboard/hardware/${hardware._id}/products`}
          className="hover:text-md text-base font-bold text-textfooter underline hover:opacity-80"
        >
          {role === "hardware dealer"
            ? "See your products"
            : "Explore Products"}
        </Link>
        {role !== "hardware dealer" && (
          <button
            className="text-md rounded-lg bg-textfooter px-6 py-1 font-semibold text-bgfooter"
            onClick={handleGetDirections}
          >
            Get Directions
          </button>
        )}
      </div>
    </div>
  );
}
