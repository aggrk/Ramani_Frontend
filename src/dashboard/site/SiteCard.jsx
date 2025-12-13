import { Clock, Users, MapPin, Banknote, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utils";

export default function SiteCard({ site }) {
  return (
    <Link
      className={`block transform cursor-pointer overflow-hidden rounded-lg bg-bgfooter shadow-sm transition-all hover:shadow-md ${
        site.urgent ? "ring-accent ring-2" : ""
      }`}
      to={`/dashboard/sites/${site._id}`}
      aria-label={`View details for ${site.siteTitle}`}
    >
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-textcolor">{site.siteTitle}</h3>
          {site.urgent && (
            <span className="whitespace-nowrap rounded-full bg-textcolor px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              Urgent Hiring
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-textfooter">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {site.siteAddress.street}, {site.siteAddress.city}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-textcolor">
          {site.description}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-3 text-sm md:grid-cols-4">
          <div className="flex items-center gap-2 rounded-lg bg-textcolor p-2">
            <Users className="h-4 w-4 flex-shrink-0 text-primary" />
            <div className="flex items-center gap-1">
              <div className="font-medium text-bgfooter">
                {site.requiredHandymen}
              </div>
              <div className="text-xs text-bgfooter">Workers</div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-textcolor p-2">
            <Banknote className="h-4 w-4 flex-shrink-0 text-primary" />
            <div>
              <div className="text-xs font-medium text-bgfooter sm:text-sm">
                {site.paymentPerDay}/day
              </div>
            </div>
          </div>

          <div className="col-span-2 flex items-center gap-2 rounded-lg bg-textcolor p-2 md:col-span-1">
            <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
            <div className="text-xs font-medium text-bgfooter sm:text-sm">
              {formatDate(site.dates.start)} - {formatDate(site.dates.end)}
            </div>
          </div>

          {site.skillsRequired && (
            <div className="col-span-2 flex items-center gap-2 rounded-lg bg-textcolor p-2">
              <Hammer className="h-4 w-4 flex-shrink-0 text-primary" />
              <div className="flex flex-wrap gap-1">
                {site.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-bgcolor bg-bgfooter px-2 py-1 text-xs text-textcolor"
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
