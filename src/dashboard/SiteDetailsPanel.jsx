import {
  BadgeInfo,
  CalendarDays,
  DollarSign,
  LocateFixed,
  MapPin,
  Navigation,
  Users,
} from "lucide-react";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function SiteDetailPanel({ site, onBack }) {
  const [userLocation, setUserLocation] = useState("");
  const [showDirections, setShowDirections] = useState(false);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
          setShowDirections(true);
        },
        (error) => alert("Error getting location: " + error.message)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-accent/10 overflow-hidden">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 p-4 text-primary font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to listings
        </button>
      )}

      {/* Directions Toggle */}
      <div className="flex border-b border-accent/10">
        <button
          onClick={() => setShowDirections(false)}
          className={`flex-1 py-3 font-medium ${
            !showDirections
              ? "text-primary border-b-2 border-primary"
              : "text-textlight"
          }`}
        >
          Map View
        </button>
        <button
          onClick={() => setShowDirections(true)}
          className={`flex-1 py-3 font-medium ${
            showDirections
              ? "text-primary border-b-2 border-primary"
              : "text-textlight"
          }`}
        >
          Get Directions
        </button>
      </div>

      {showDirections ? (
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Your location"
              className="flex-1 p-2 border border-accent/20 rounded-lg"
            />
            <button
              onClick={handleLocateMe}
              className="p-2 bg-neutral/5 rounded-lg hover:bg-neutral/10"
              title="Use my current location"
            >
              <LocateFixed className="w-5 h-5" />
            </button>
          </div>

          {userLocation ? (
            <div className="h-96 w-full">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${encodeURIComponent(
                  userLocation
                )}&destination=${site.coordinates.coordinates[0]},${
                  site.coordinates.coordinates[1]
                }&mode=driving`}
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-textlight">
              Enter your location to see directions
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Interactive Map */}
          <div className="h-64 sm:h-80 w-full relative">
            <MapContainer
              center={site.coordinates}
              zoom={14}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={site.coordinates}>
                <Popup>{site.name}</Popup>
              </Marker>
            </MapContainer>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${site.coordinates[0]},${site.coordinates[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md z-10 hover:bg-neutral/5"
            >
              <Navigation className="w-5 h-5 text-primary" />
            </a>
          </div>

          {/* Site Details */}
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-textdark">{site.name}</h3>
              <div className="flex items-center gap-2 mt-1 text-primary">
                <MapPin className="w-5 h-5" />
                <span>{site.siteAddress.country}</span>
              </div>
            </div>

            <p className="text-textdark">{site.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-neutral/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-textlight">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Positions</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-textdark">
                  {site.requiredHandymen} Handymen
                </p>
              </div>

              <div className="bg-neutral/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-textlight">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Daily Rate</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-textdark">
                  {site.paymentPerDay}
                </p>
              </div>

              <div className="bg-neutral/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-textlight">
                  <CalendarDays className="w-5 h-5" />
                  <span className="font-medium">Duration</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-textdark">
                  {site.dates.start} - {site.dates.end}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-accent/10">
              <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center justify-center gap-2">
                <BadgeInfo className="w-5 h-5" />
                <span>Apply for This Position</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
