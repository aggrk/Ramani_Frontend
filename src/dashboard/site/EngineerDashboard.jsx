import {
  Building,
  Calendar,
  ChevronRight,
  FileText,
  HardHat,
  Search,
  SettingsIcon,
  Truck,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function EngineerDashboard() {
  const { user } = useAuth();
  const { name } = user.data;

  const stats = [
    {
      title: "Applications",
      value: 12,
      change: "+2",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-primary/10 text-primary",
      trend: "up",
    },
    {
      title: "Hardware Orders",
      value: 8,
      change: "+3",
      icon: <HardHat className="h-5 w-5" />,
      color: "bg-secondary/10 text-secondary",
      trend: "up",
    },
    {
      title: "Pending Deliveries",
      value: 5,
      change: "-1",
      icon: <Truck className="h-5 w-5" />,
      color: "bg-accent/10 text-textdark",
      trend: "down",
    },
    {
      title: "Upcoming Tasks",
      value: 7,
      change: "+2",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-neutral/10 text-textdark",
      trend: "up",
    },
  ];

  const quickActions = [
    {
      title: "My Profile",
      icon: <UserCircle className="h-6 w-6" />,
      link: "profile",
      color: "text-primary",
    },
    {
      title: "My Sites",
      icon: <Building className="h-6 w-6" />,
      link: "sites",
      color: "text-secondary",
    },
    {
      title: "Shop",
      icon: <HardHat className="h-6 w-6" />,
      link: "hardware",
      color: "text-accent",
    },
    {
      title: "Applications",
      icon: <FileText className="h-6 w-6" />,
      link: "applications",
      color: "text-primary",
    },
    {
      title: "Settings",
      icon: <SettingsIcon className="h-6 w-6" />,
      link: "applications",
      color: "text-primary",
    },
  ];

  return (
    <>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-1 text-2xl font-bold text-textdark sm:text-3xl">
              Welcome back, {name.split(" ")[0]}!
            </h2>
            <p className="text-textlight">
              Here's what's happening with your projects today
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-textlight" />
            <input
              type="text"
              aria-label="Search sites, materials, or suppliers"
              placeholder="Search sites, materials, or suppliers..."
              className="w-full rounded-lg border border-accent/20 py-2.5 pl-10 pr-4 transition-all focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group transform rounded-xl border border-accent/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="mb-1 mt-4 text-2xl font-bold text-textdark">
                {stat.value}
              </h3>
              <p className="text-sm text-textlight">{stat.title}</p>
              <div className="mt-3 flex items-center justify-between border-t border-accent/10 pt-3">
                <span className="text-xs text-textlight">View all</span>
                <ChevronRight className="h-4 w-4 text-textlight transition-colors group-hover:text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions - More visual hierarchy */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-textdark">
              Quick Actions
            </h3>
            <Link
              to="/dashboard/actions"
              className="flex items-center text-sm text-primary hover:underline"
            >
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {quickActions.map((action, index) => {
              return (
                <Link
                  key={index}
                  to={`/dashboard/${action.link}`}
                  className="flex transform flex-col items-center rounded-xl border border-accent/10 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-textdark">
                    {action.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
