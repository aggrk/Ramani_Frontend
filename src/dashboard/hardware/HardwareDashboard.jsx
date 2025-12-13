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
            <h2 className="mb-1 text-2xl font-bold text-textcolor sm:text-3xl">
              Welcome back, {name.split(" ")[0]}!
            </h2>
            <p className="text-textsecondary">
              Here's what's happening with your projects today
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-textsecondary" />
            <input
              type="text"
              aria-label="Search sites, materials, or suppliers"
              placeholder="Search sites, materials, or suppliers..."
              className="w-full rounded-lg border border-neutral bg-bgcolor py-2.5 pl-10 pr-4 text-textcolor outline-none transition-all placeholder:text-textsecondary placeholder:opacity-75 focus:border-neutral focus:ring-2 focus:ring-neutral"
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
          <div className="col-span-4 space-y-6 md:col-span-3">
            <StatsCard
              length={myHardwareCount}
              title="Shops"
              link="my-shops"
              extraStyle="secondary"
              icon={<HardHat className="text-secondary h-6 w-6" />}
            />
            <StatsCard
              length=""
              title="Orders Received"
              link="received-orders"
              extraStyle="secondary"
              icon={<ClipboardCheck className="text-secondary h-6 w-6" />}
            />
            <StatsCard
              length=""
              title="Orders Served"
              link="served-orders"
              extraStyle="secondary"
              icon={<CheckCircle className="text-secondary h-6 w-6" />}
            />
          </div>

          <div className="col-span-1 hidden border border-textsecondary p-4 md:flex md:flex-col md:gap-4 md:rounded-lg md:bg-bgcolor md:shadow-lg">
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
