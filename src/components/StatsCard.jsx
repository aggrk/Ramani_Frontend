import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatsCard({ length, title, icon }) {
  return (
    <div className="flex w-full flex-col justify-between gap-y-2 rounded-lg bg-bgcolor p-4 sm:w-40">
      <div className="flex items-center justify-start">{icon}</div>

      <div className="space-y-1">
        <p className="text-2xl font-bold leading-none text-textcolor">
          {length || 0}
        </p>
        <h3 className="text-sm font-medium text-textcolor">{title}</h3>
        <p className="text-xs text-textsecondary">+10% from yesterday</p>
      </div>
    </div>
  );
}
