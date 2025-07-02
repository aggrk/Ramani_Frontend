import {
  Building,
  FileText,
  HardHat,
  UserCircle,
  ChevronRight,
  Search,
  Truck,
  CheckCircle,
  XCircle,
  Settings,
  Heart,
  Star,
  CircleDotDashed,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ActivityIndicator from "../../components/ActivityIndicator";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserDashboard() {
  const [applications, setApplications] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { name } = user?.data || {};

  const apps = applications?.data?.applications || [];

  const approvedCount = apps.filter((app) => app.status === "accepted").length;
  const unapprovedCount = apps.filter((app) => app.status === "pending").length;
  const rejectedCount = apps.filter((app) => app.status === "rejected").length;

  useEffect(() => {
    const getUserApplication = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.get(
          `${apiUrl}/applications/getMyApplications`,
          { withCredentials: true },
        );

        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setIsLoading(false);
      }
    };

    getUserApplication();
  }, []);

  const stats = [
    {
      title: "My Applications",
      value: apps.length,
      icon: <FileText className="h-5 w-5" />,
      color: "bg-secondary/10 text-secondary",
      trend: "up",
    },
    {
      title: "Approved Jobs",
      value: approvedCount,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-secondary/10 text-secondary",
      trend: "up",
    },
    {
      title: "Pending Deliveries",
      value: 5,
      icon: <Truck className="h-5 w-5" />,
      color: "bg-secondary/10 text-secondary",
      trend: "down",
    },
    {
      title: "Jobs not approved",
      value: unapprovedCount,
      icon: <CircleDotDashed className="h-5 w-5 animate-spin text-secondary" />,
      color: "bg-secondary/10 text-primary",
      trend: "up",
    },
    {
      title: "Rejected Applications",
      value: rejectedCount,
      icon: <XCircle className="h-5 w-5" />,
      color: "bg-secondary/10 text-primary",
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
      title: "Find a Job",
      icon: <Building className="h-6 w-6" />,
      link: "sites",
      color: "text-primary",
    },
    {
      title: "Shop",
      icon: <HardHat className="h-6 w-6" />,
      link: "hardware",
      color: "text-primary",
    },
    {
      title: "My Applications",
      icon: <FileText className="h-6 w-6" />,
      link: "applications",
      color: "text-primary",
    },
    {
      title: "Products in Wishlist",
      icon: <Heart className="h-6 w-6 fill-primary" />,
      link: "applications",
      color: "text-primary",
    },
    {
      title: "Favorite Hardware",
      icon: <Star className="h-6 w-6 fill-primary" />,
      link: "applications",
      color: "text-primary",
    },
    {
      title: "Settings",
      icon: <Settings className="h-6 w-6" />,
      link: "settings",
      color: "text-primary",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-textdark sm:text-4xl">
            Welcome Back, {name.split(" ")[0]}!
          </h2>
          <p className="mt-1 text-base text-textlight opacity-80">
            Your project overview awaits
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-textlight" />
          <input
            type="text"
            aria-label="Search sites, materials, or suppliers"
            placeholder="Search sites, materials, or suppliers..."
            className="w-full rounded-lg border border-accent/20 py-2.5 pl-10 pr-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative transform overflow-hidden rounded-2xl border border-accent/10 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            {/* Subtle gradient overlay for modern effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-start justify-between">
              <div
                className={`rounded-full p-3 ${stat.color} transition-transform duration-300 group-hover:scale-110`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                } transition-opacity duration-300 group-hover:opacity-80`}
              >
                {/* Placeholder for change value */}
              </span>
            </div>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-textdark">
              {stat.value}
            </h3>
            <p className="mt-1 text-sm text-textlight opacity-80">
              {stat.title}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-accent/10 pt-4">
              <span className="text-xs font-medium text-textlight transition-colors duration-300 group-hover:text-primary">
                View details
              </span>
              <ChevronRight className="h-4 w-4 text-textlight transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-10">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold tracking-tight text-textdark">
            Quick Actions
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={`/dashboard/${action.link}`}
              className="group relative flex transform flex-col items-center overflow-hidden rounded-xl border border-accent/10 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-in-out hover:border-primary/20 hover:shadow-md"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className={`relative rounded-full bg-primary/5 p-3 ${action.color} transition-transform duration-300 group-hover:scale-110`}
              >
                {action.icon}
              </div>
              <span className="mt-3 text-sm font-medium tracking-tight text-textdark transition-colors duration-300 group-hover:text-primary">
                {action.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
