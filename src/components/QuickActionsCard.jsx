import { Link } from "react-router-dom";

export default function QuickActionsCard({ link, icon, title }) {
  return (
    <Link
      to={`/dashboard/${link}`}
      className="flex transform flex-col items-center rounded-xl border border-accent/10 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
    >
      <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <span className="text-sm font-medium text-textdark">{title}</span>
    </Link>
  );
}
