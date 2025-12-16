import {
  Building,
  FileText,
  HardHat,
  UserCircle,
  Truck,
  CheckCircle,
  XCircle,
  Settings,
  Star,
  CircleDotDashed,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import StatsCard from "../../components/StatsCard";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { user } = useAuth();
  const { name } = user?.data || {};
  const { data } = useFetch("applications", "applications/getMyApplications");
  const applications = data?.data?.applications || [];

  const approvedCount = applications.filter(
    (app) => app.status === "accepted",
  ).length;
  const unapprovedCount = applications.filter(
    (app) => app.status === "pending",
  ).length;
  const rejectedCount = applications.filter(
    (app) => app.status === "rejected",
  ).length;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="col-span-1 hidden h-screen items-start gap-8 rounded-md bg-bgfooter pl-6 sm:flex sm:flex-col">
          <div className="mt-12 flex gap-4">
            <UserCircle className="h-6 w-6 text-textfooter" />
            <Link
              to="profile"
              className="text-base text-textcolor hover:underline"
            >
              Profile
            </Link>
          </div>
          <div className="flex gap-4">
            <HardHat className="h-6 w-6 text-textfooter" />
            <Link
              to="hardware"
              className="text-base text-textcolor hover:underline"
            >
              Shops
            </Link>
          </div>
          <div className="flex gap-4">
            <Building className="h-6 w-6 text-textfooter" />
            <Link
              to="sites"
              className="text-base text-textcolor hover:underline"
            >
              Sites
            </Link>
          </div>
          <div className="flex gap-4">
            <FileText className="h-6 w-6 text-textfooter" />
            <Link
              to="applications"
              className="text-base text-textcolor hover:underline"
            >
              Applications
            </Link>
          </div>
          <div className="flex gap-4">
            <Star className="h-6 w-6 fill-textfooter text-textfooter" />
            <Link to="" className="text-base text-textcolor hover:underline">
              Favorite Products
            </Link>
          </div>
          <div className="flex gap-4">
            <Settings className="h-6 w-6 text-textfooter" />
            <Link
              to="settings"
              className="text-base text-textcolor hover:underline"
            >
              Settings
            </Link>
          </div>
        </div>
        <div className="w-full sm:col-span-3">
          <div className="flex w-full flex-col rounded-lg bg-bgfooter shadow-md">
            <h2 className="p-4 text-2xl font-extrabold tracking-tight text-textcolor sm:text-4xl">
              Welcome Back, {name.split(" ")[0]}!
            </h2>
            <div className="grid w-full grid-cols-2 gap-2 p-4 sm:flex sm:flex-wrap sm:gap-2">
              <StatsCard
                title="My Applications"
                icon={<FileText className="h-8 w-8 text-textsecondary" />}
                length={applications.length}
              />
              <StatsCard
                title="Approved Jobs"
                icon={<CheckCircle className="h-8 w-8 text-textsecondary" />}
                length={approvedCount}
                extraStyle="secondary"
              />
              <StatsCard
                title="Pending Deliveries"
                icon={<Truck className="h-8 w-8 text-textsecondary" />}
                length=""
                extraStyle="secondary"
              />
              <StatsCard
                title="Pending Jobs"
                icon={
                  <CircleDotDashed className="h-8 w-8 animate-spin text-textsecondary" />
                }
                length={unapprovedCount}
                extraStyle="secondary"
              />
              <StatsCard
                title="Rejected Applications"
                icon={<XCircle className="h-8 w-8 text-textsecondary" />}
                length={rejectedCount}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
