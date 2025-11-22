import {
  Calendar,
  CircleCheck,
  CircleDotDashed,
  CircleX,
  HandCoins,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { formatDate } from "../../utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../utils/api";

const customStyles = {
  content: {
    maxWidth: "80rem",
    width: "95%",
    margin: "1rem auto",
    padding: "0",
    inset: "auto",
    border: "none",
    borderRadius: "10px",
    overflow: "hidden",
    maxHeight: "90vh",
    height: "800px",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "1rem",
    zIndex: 1000,
    overflowY: "scroll",
  },
};

Modal.setAppElement("div");

export default function AppCard({ app }) {
  const [userLocation, setUserLocation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const application = app.siteId;
  const coord = application.coordinates.coordinates;

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          (err) => {
            console.error("Error getting user Location: ", err);
          },
        );
      });
    } else {
      console.error("Geolocation not supported in this browser");
    }
  }, []);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${coord[0]},${coord[1]}`,
    );
  };

  const route = userLocation
    ? [[userLocation.lat, userLocation.lng], coord]
    : [];

  return (
    <div className="flex flex-col gap-4 rounded-md border border-accent bg-white p-4 shadow-lg">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        ariaHideApp={false}
        closeTimeoutMS={200}
      >
        <div className="relative flex h-full flex-col">
          <span
            className="absolute right-2 top-2 z-10 cursor-pointer text-[#781717]"
            onClick={handleCloseModal}
          >
            <CircleX className="h-6 w-6 sm:h-8 sm:w-8" />
          </span>

          <div className="mt-8 flex-1 p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 rounded-md bg-[#781717] p-4 md:p-6">
                <div className="flex flex-col items-start justify-between gap-2 border-b border-neutral border-opacity-20 pb-2 sm:flex-row sm:items-center">
                  <h1 className="sm:text-md text-sm font-bold uppercase tracking-wider text-neutral md:text-xl">
                    {application.siteTitle}
                  </h1>
                  <button
                    className="cursor-pointer rounded-full border-2 border-neutral px-4 py-1 text-xs font-semibold tracking-wider text-neutral shadow-lg hover:bg-neutral hover:text-[#781717] sm:px-4 sm:py-1 sm:text-sm lg:px-6 lg:py-2 lg:text-base"
                    onClick={() => handleDeleteApplication(app._id)}
                  >
                    Delete
                  </button>
                </div>
                <p className="md:text-md text-sm font-medium italic leading-5 tracking-wide text-neutral opacity-80 lg:text-lg">
                  {application.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-md border-2 border-[#781717] p-3 sm:flex sm:flex-wrap sm:gap-4 sm:border-none sm:p-0">
                <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-xs shadow-sm sm:text-sm">
                  <span className="font-bold text-[#781717] opacity-90">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <p className="truncate text-[#000000]">
                    {application.siteAddress.region}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-xs shadow-sm sm:text-sm">
                  <span className="font-bold text-[#781717] opacity-85">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <p className="truncate text-[#000000]">
                    {formatDate(application.dates.start)} -{" "}
                    {formatDate(application.dates.end)}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-xs shadow-sm sm:text-sm">
                  <span className="font-bold text-[#781717] opacity-85">
                    {app.status === "accepted" && (
                      <CircleCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                    {app.status === "pending" && (
                      <CircleDotDashed className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                    {app.status === "rejected" && (
                      <CircleX className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </span>
                  <p className="capitalize text-[#000000]">{app.status}</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-xs shadow-sm sm:text-sm">
                  <span className="font-bold text-[#781717] opacity-85">
                    <HandCoins className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <p className="text-[#000000]">{application.paymentPerDay}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="h-64 min-h-[16rem] sm:h-80 lg:h-96">
                  <MapContainer
                    center={coord}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-full w-full rounded-md"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coord}>
                      <Popup>{application.siteTitle}</Popup>
                    </Marker>
                    {userLocation && (
                      <Polyline positions={route} color="blue" />
                    )}
                  </MapContainer>
                </div>
                <button
                  className="mb-2 self-start border-2 border-[#781717] px-3 py-1 text-sm font-bold tracking-wider text-[#781717] shadow-md hover:shadow-lg sm:px-4 sm:py-2 sm:text-base"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="w-full border-b border-gray-400 border-opacity-30">
        <h3 className="text-md mb-2 font-bold uppercase tracking-wide text-[#781717]">
          {application.siteTitle}
        </h3>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-sm shadow-sm">
          <span className="font-bold text-[#781717] opacity-90">
            <MapPin className="h-5 w-5" />
          </span>
          <p className="text-[#000000]">{application.siteAddress.region}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-sm shadow-sm">
          <span className="font-bold text-[#781717] opacity-85">
            <Calendar className="h-5 w-5" />
          </span>
          <p className="text-[#000000]">
            {formatDate(application.dates.start)} -{" "}
            {formatDate(application.dates.end)}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-sm shadow-sm">
          <span className="font-bold text-[#781717] opacity-85">
            {app.status === "accepted" && <CircleCheck className="h-5 w-5" />}{" "}
            {app.status === "pending" && (
              <CircleDotDashed className="h-5 w-5" />
            )}
            {app.status === "rejected" && <CircleX className="h-5 w-5" />}
          </span>
          <p className="text-[#000000]">{app.status}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral p-2 text-sm shadow-sm">
          <span className="font-bold text-[#781717] opacity-85">
            <HandCoins className="h-5 w-5" />
          </span>
          <p className="text-[#000000]">{application.paymentPerDay}</p>
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
          onClick={() => mutation.mutate()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
