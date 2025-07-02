import { Clock, Users, MapPin, Banknote, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utils";

export default function SiteCard({ site }) {
  return (
    <Link
      className={`block transform cursor-pointer overflow-hidden rounded-lg border border-accent/10 bg-white shadow-sm transition-all hover:shadow-md ${
        site.urgent ? "ring-2 ring-accent" : ""
      }`}
      to={`/dashboard/sites/${site._id}`}
      aria-label={`View details for ${site.siteTitle}`}
    >
      <div className="space-y-3 p-5">
        {/* Header with title and urgent badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-textdark">{site.siteTitle}</h3>
          {site.urgent && (
            <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              Urgent Hiring
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-primary">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {site.siteAddress.street}, {site.siteAddress.city}
          </span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-textlight">
          {site.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 text-sm md:grid-cols-4">
          {/* Workers Needed */}
          <div className="flex items-center gap-2 rounded-lg bg-neutral p-2">
            <Users className="h-4 w-4 flex-shrink-0 text-primary" />
            <div className="flex items-center gap-1">
              <div className="font-medium text-textdark">
                {site.requiredHandymen}
              </div>
              <div className="text-xs text-textlight">Workers</div>
            </div>
          </div>

          {/* Payment */}
          <div className="flex items-center gap-2 rounded-lg bg-neutral p-2">
            <Banknote className="h-4 w-4 flex-shrink-0 text-primary" />
            <div>
              <div className="text-xs font-medium text-textdark sm:text-sm">
                {site.paymentPerDay}/day
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="col-span-2 flex items-center gap-2 rounded-lg bg-neutral p-2 md:col-span-1">
            <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
            <div className="text-xs font-medium text-textdark sm:text-sm">
              {formatDate(site.dates.start)} - {formatDate(site.dates.end)}
            </div>
          </div>

          {/* Skills */}
          {site.skillsRequired && (
            <div className="col-span-2 flex items-center gap-2 rounded-lg bg-neutral p-2">
              <Hammer className="h-4 w-4 flex-shrink-0 text-primary" />
              <div className="flex flex-wrap gap-1">
                {site.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-accent/10 bg-white px-2 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
