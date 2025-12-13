import { Link } from "react-router-dom";

export default function QuickActionsCard({
  link,
  icon = "",
  title,
  onClick = "",
}) {
  return (
    <Link
      to={`/dashboard/${link}`}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg border border-transparent p-3 transition-all hover:border-textcolor hover:bg-textcolor/10"
    >
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-textcolor text-xl text-bgcolor transition-all group-hover:bg-primary/30">
          {icon}
        </div>
      )}
      <span className="text-sm font-medium tracking-wide text-textsecondary transition-colors group-hover:text-primary">
        {title}
      </span>
    </Link>
  );
}
