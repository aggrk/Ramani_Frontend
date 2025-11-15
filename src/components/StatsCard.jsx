import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatsCard({
  length,
  title,
  link,
  icon,
  extraStyle = "primary",
}) {
  return (
    <div className="group transform rounded-xl border border-accent/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`rounded-xl bg-${extraStyle}/10 p-3 text-primary`}>
          {icon}
        </div>
      </div>
      <h3 className="mb-1 mt-4 text-2xl font-bold text-textdark">
        {length || 0}
      </h3>
      <p className="text-sm text-textlight">{title}</p>
      <div className="mt-3 flex items-center justify-between border-t border-accent/10 pt-3">
        <Link to={`${link}`} className="text-xs text-textlight">
          View all
        </Link>
        <ChevronRight className="h-4 w-4 text-textlight transition-colors group-hover:text-primary" />
      </div>
    </div>
  );
}
