import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {
  MapPin,
  Users,
  CalendarDays,
  Banknote,
  Clock,
  HardHat,
  Layers,
  ChevronLeft,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";
import ActivityIndicator from "../../components/ActivityIndicator";
import { formatDate } from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";

export default function ApplicationDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { role } = user?.data;
  const { data, isPending, error } = useFetch(
    "application",
    `/applications/${id}`,
  );
  const [userLocation, setUserLocation] = useState("");
  console.log(data);
  const application = data?.data?.application;
  const selectedSite = data?.data?.application?.siteId;

  const coord = selectedSite?.coordinates?.coordinates;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => api.delete(`/applications/${id}`),
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Error getting user location: ", err);
        },
      );
    } else {
      console.error("Geolocation not supported in this browser");
    }
  }, []);

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${coord[0]},${coord[1]}`,
    );
  };

  return (
    <div className="min-h-screen">
      {isPending ? (
        <div className="flex h-screen items-center justify-center">
          <ActivityIndicator size="lg" />
        </div>
      ) : selectedSite ? (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 overflow-hidden rounded-2xl bg-bgfooter shadow-lg">
            <div className="p-8 text-textcolor">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-textcolor/20 px-2 py-1 text-xs font-semibold text-textcolor">
                      {selectedSite.siteAddress.country}
                    </span>
                    <span className="text-sm font-medium opacity-90">
                      {selectedSite.siteAddress.city}
                    </span>
                  </div>
                  <h1 className="text-xl font-bold tracking-wide md:text-3xl md:tracking-normal">
                    {selectedSite.siteTitle}
                  </h1>
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm sm:text-base">
                    {selectedSite.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start rounded-lg bg-textcolor px-6 py-2 text-sm font-semibold text-bgcolor shadow-sm md:self-auto md:py-3 lg:text-base">
                  {application.status.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y divide-textcolor/10 border-t border-textcolor/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-textcolor/20 p-2 text-textsecondary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-textfooter">Positions</p>
                    <p className="text-sm font-semibold text-textcolor sm:text-base">
                      {selectedSite.requiredHandymen} Handymen
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-textcolor/20 p-2 text-textsecondary">
                    <Banknote className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-textfooter">Daily Rate</p>
                    <p className="text-sm font-semibold text-textcolor sm:text-base">
                      {selectedSite.paymentPerDay}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-textcolor/20 p-2 text-textsecondary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-textfooter">Duration</p>
                    <p className="text-sm font-semibold text-textcolor sm:text-base">
                      {formatDate(selectedSite.dates.start)} -{" "}
                      {formatDate(selectedSite.dates.end)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-bgfooter p-2 shadow-lg">
                <div className="h-64 min-h-[16rem] sm:h-80 lg:h-96">
                  <MapContainer
                    center={coord}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-full w-full rounded-md"
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coord}>
                      <Popup>{selectedSite.siteTitle}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <button
                  className="mb-2 self-start rounded-full border-2 border-textcolor px-3 py-1 text-sm font-bold tracking-wider text-textcolor shadow-md sm:px-4 sm:py-2 sm:text-base"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </button>
              </div>

              <div className="flex-1 overflow-hidden rounded-2xl bg-bgfooter p-6 shadow-lg">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-textcolor">
                  <Layers className="h-5 w-5 text-textsecondary" />
                  Job Details
                </h2>
                <p className="text-sm text-textcolor lg:text-base">
                  {selectedSite.description}
                </p>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="mb-6 overflow-hidden rounded-2xl bg-bgfooter shadow-lg">
                <div className="border-b border-textcolor/10 p-6">
                  <h3 className="text-base font-semibold text-textcolor lg:text-lg">
                    Job Summary
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-textsecondary">
                        <HardHat className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-textcolor">
                          Job Type
                        </p>
                        <p className="text-xs text-textsecondary sm:text-sm">
                          Construction
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-textsecondary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-textcolor">
                          Work Hours
                        </p>
                        <p className="text-xs text-textsecondary sm:text-sm">
                          8:00 AM - 5:00 PM
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-textsecondary">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-textcolor">
                          Team Size
                        </p>
                        <p className="text-xs text-textsecondary sm:text-sm">
                          {selectedSite.requiredHandymen} people
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-textsecondary">
                        <Banknote className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-textcolor">
                          Payment
                        </p>
                        <p className="text-xs text-textsecondary sm:text-sm">
                          {selectedSite.paymentPerDay} per day
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-6 overflow-hidden rounded-2xl bg-bgfooter shadow-lg">
                <div className="border-b border-textcolor/10 p-6">
                  <h3 className="text-base font-semibold text-textcolor lg:text-lg">
                    Site Address
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex">
                    <div className="text-textsecondary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="ml-3 flex gap-1 tracking-wider">
                      <p className="text-xs text-textcolor sm:text-sm">
                        {selectedSite.siteAddress.street}
                      </p>
                      <p className="text-xs text-textcolor sm:text-sm">
                        {selectedSite.siteAddress.city},{" "}
                        {selectedSite.siteAddress.state}
                      </p>
                      <p className="text-xs text-textcolor sm:text-sm">
                        {selectedSite.siteAddress.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {role === "user" && (
                <div className="overflow-hidden rounded-2xl bg-textcolor p-6 text-white shadow-lg">
                  <h3 className="mb-3 text-lg font-semibold text-bgfooter">
                    Changed Your Mind?
                  </h3>
                  <button
                    className="hover:bg-accent flex w-full items-center justify-center gap-2 rounded-lg bg-bgfooter py-3 font-semibold text-textcolor transition-all"
                    onClick={() => mutation.mutate()}
                  >
                    {mutation.isPending ? (
                      <ActivityIndicator size="xs" />
                    ) : (
                      <span>Delete Application</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="max-w-md p-6 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-textcolor/20">
              <MapPin className="h-10 w-10 text-textsecondary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-textcolor">
              Project Not Found
            </h3>
            <p className="mb-6 text-textfooter">
              The project you're looking for doesn't exist or may have been
              removed.
            </p>
            <Link
              to="/dashboard/sites"
              className="inline-flex items-center gap-2 rounded-lg bg-textcolor px-6 py-2 font-medium text-bgfooter transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Browse Sites
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
