import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  CheckCircle,
  ClipboardCheck,
  HardHat,
  Plus,
  Search,
  SettingsIcon,
  UserCircle,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import QuickActionsCard from "../../components/QuickActionsCard";
import useFetch from "../../hooks/useFetch";

export default function HardwareDashboard() {
  const { user } = useAuth();
  const { name } = user.data;
  const { data } = useFetch("myHardware", "/hardware/myHardware");
  const myHardwareCount = data?.results;

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
          <StatsCard
            length={myHardwareCount}
            title="Shops"
            link="my-shops"
            extraStyle="secondary"
            icon={<HardHat className="h-6 w-6 text-secondary" />}
          />
          <StatsCard
            length=""
            title="Orders Received"
            link="received-orders"
            extraStyle="secondary"
            icon={<ClipboardCheck className="h-6 w-6 text-secondary" />}
          />
          <StatsCard
            length=""
            title="Orders Served"
            link="served-orders"
            extraStyle="secondary"
            icon={<CheckCircle className="h-6 w-6 text-secondary" />}
          />
        </div>

        {/* Quick Actions - More visual hierarchy */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-textdark">
              Quick Actions
            </h3>
            {/* <Link
              to="/dashboard/actions"
              className="flex items-center text-sm text-primary hover:underline"
            >
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Link> */}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <QuickActionsCard
              link="profile"
              icon={<UserCircle className="h-6 w-6" />}
              title="My Profile"
            />
            <QuickActionsCard
              link="my-shops"
              icon={<HardHat className="h-6 w-6" />}
              title="My Shops"
            />
            <QuickActionsCard
              link="add-shop"
              icon={<Plus className="h-6 w-6" />}
              title="Register Shop"
            />
            <QuickActionsCard
              link="settings"
              icon={<SettingsIcon className="h-6 w-6" />}
              title="Settings"
            />
          </div>
        </div>
      </main>
    </>
  );
}
