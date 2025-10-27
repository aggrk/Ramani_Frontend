import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function SiteDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { role } = user?.data;
  const { data, isPending, isError } = useFetch("site", `/sites/${id}`);
  const [userLocation, setUserLocation] = useState("");
  const selectedSite = data?.data?.site;
  console.log(data);

  const coord = selectedSite?.coordinates?.coordinates;
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: () => api.post(`/sites/${id}/applications`, {}),
    onSuccess: () => {
      (toast.success(
        "Your application was successfull! We will get bask to you soon!",
      ),
        queryClient.invalidateQueries(["applications"]));
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });

  const deleteSite = useMutation({
    mutationFn: () => api.delete(`/sites/${id}`, {}),
    onSuccess: () => {
      (toast.success("Site deleted succesfully"),
        queryClient.invalidateQueries(["sites"]));
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });

  return (
    <div className="min-h-screen bg-neutral">
      {isPending ? (
        <div className="flex h-screen items-center justify-center">
          <ActivityIndicator size="lg" />
        </div>
      ) : selectedSite.length > 0 ? (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-lg">
            <div className="bg-primary p-8 text-white">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">
                      {selectedSite.siteAddress.country}
                    </span>
                    <span className="text-sm font-medium opacity-90">
                      {selectedSite.siteAddress.city}
                    </span>
                  </div>
                  <h1 className="text-xl font-bold tracking-wide md:text-3xl md:tracking-normal">
                    {selectedSite.siteTitle}
                  </h1>
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-accent sm:text-base">
                    {selectedSite.description}
                  </p>
                </div>
                {role === "engineer" && (
                  <button
                    disabled={deleteSite.isPending}
                    className="flex items-center gap-2 self-start rounded-lg bg-white px-6 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-accent md:self-auto md:py-3 lg:text-base"
                    onClick={() => deleteSite.mutate()}
                  >
                    {deleteSite.isPending ? (
                      <ActivityIndicator size="xs" />
                    ) : (
                      <span>Delete Site</span>
                    )}
                  </button>
                )}
                {role === "user" && (
                  <button
                    disabled={mutation.isPending}
                    className="flex items-center gap-2 self-start rounded-lg bg-white px-6 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-accent md:self-auto md:py-3 lg:text-base"
                    onClick={() => mutation.mutate()}
                  >
                    {mutation.isPending ? (
                      <ActivityIndicator size="xs" />
                    ) : (
                      <>
                        <HardHat className="h-5 w-5" />
                        <span>Apply Now</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 divide-y divide-accent/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/20 p-2 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Positions</p>
                    <p className="text-sm font-semibold text-textdark sm:text-base">
                      {selectedSite.requiredHandymen} Handymen
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/20 p-2 text-primary">
                    <Banknote className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Daily Rate</p>
                    <p className="text-sm font-semibold text-textdark sm:text-base">
                      {selectedSite.paymentPerDay}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/20 p-2 text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Duration</p>
                    <p className="text-sm font-semibold text-textdark sm:text-base">
                      {formatDate(selectedSite.dates.start)} -{" "}
                      {formatDate(selectedSite.dates.end)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {/* Map/Directions Section */}
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-2 shadow-lg">
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
                      <Popup>{selectedSite.siteTitle}</Popup>
                    </Marker>
                    {/* {userLocation && (
                      <Polyline positions={route} color="blue" />
                    )} */}
                  </MapContainer>
                </div>
                <button
                  className="mb-2 self-start border-2 border-[#781717] px-3 py-1 text-sm font-bold tracking-wider text-[#781717] shadow-md hover:shadow-lg sm:px-4 sm:py-2 sm:text-base"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </button>
              </div>
              {/* Job Details */}
              <div className="mb-8 overflow-hidden rounded-2xl border border-accent/30 bg-white p-6 shadow-lg">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-textdark">
                  <Layers className="h-5 w-5 text-primary" />
                  Job Details
                </h2>
                <div className="max-w-none text-textlight">
                  <p className="text-sm lg:text-base">
                    {selectedSite.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/3">
              {/* Quick Info Card */}
              <div className="mb-6 overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-lg">
                <div className="border-b border-accent/20 p-6">
                  <h3 className="text-base font-semibold text-textdark lg:text-lg">
                    Job Summary
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-primary">
                        <HardHat className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-secondary">
                          Job Type
                        </p>
                        <p className="text-xs text-textdark sm:text-sm">
                          Construction
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-secondary">
                          Work Hours
                        </p>
                        <p className="text-xs text-textdark sm:text-sm">
                          8:00 AM - 5:00 PM
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-primary">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-secondary">
                          Team Size
                        </p>
                        <p className="text-xs text-textdark sm:text-sm">
                          {selectedSite.requiredHandymen} people
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-primary">
                        <Banknote className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-secondary">
                          Payment
                        </p>
                        <p className="text-xs text-textdark sm:text-sm">
                          {selectedSite.paymentPerDay} per day
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Address Card */}
              <div className="mb-6 overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-lg">
                <div className="border-b border-accent/20 p-6">
                  <h3 className="text-base font-semibold text-textdark lg:text-lg">
                    Site Address
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex">
                    <div className="text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="ml-3 flex gap-1 tracking-wider">
                      <p className="text-xs text-textdark sm:text-sm">
                        {selectedSite.siteAddress.street}
                      </p>
                      <p className="text-xs text-textdark sm:text-sm">
                        {selectedSite.siteAddress.city},{" "}
                        {selectedSite.siteAddress.state}
                      </p>
                      <p className="text-xs text-textdark sm:text-sm">
                        {selectedSite.siteAddress.country}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              {role === "user" && (
                <div className="overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-lg">
                  <h3 className="mb-3 text-lg font-semibold">
                    Interested in this project?
                  </h3>
                  <p className="mb-6 text-accent">
                    Apply now to join our team of skilled professionals.
                  </p>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-semibold text-primary transition-all hover:bg-accent"
                    onClick={() => mutation.mutate()}
                  >
                    {mutation.isPending ? (
                      <ActivityIndicator size="xs" />
                    ) : (
                      <>
                        <HardHat className="h-5 w-5" />
                        <span>Apply Now</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center bg-white">
          <div className="max-w-md p-6 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-textdark">
              Project Not Found
            </h3>
            <p className="mb-6 text-secondary">
              The project you're looking for doesn't exist or may have been
              removed.
            </p>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-medium text-white transition hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
              Browse Projects
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
