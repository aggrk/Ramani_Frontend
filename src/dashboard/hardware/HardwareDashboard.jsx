import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  CheckCircle,
  ClipboardCheck,
  HardHat,
  Plus,
  Settings,
  UserCircle,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import useFetch from "../../hooks/useFetch";

export default function HardwareDashboard() {
  const { user } = useAuth();
  const { name } = user.data;
  const { data } = useFetch("myHardware", "/hardware/myHardware");
  const myHardwareCount = data?.results;

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
              to="my-shops"
              className="text-base text-textcolor hover:underline"
            >
              My Shops
            </Link>
          </div>
          <div className="flex gap-4">
            <Plus className="h-6 w-6 text-textfooter" />
            <Link
              to="add-shop"
              className="text-base text-textcolor hover:underline"
            >
              Register Shop
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
                title="Shops"
                icon={<HardHat className="h-8 w-8 text-textsecondary" />}
                length={myHardwareCount}
                link="my-shops"
              />
              <StatsCard
                length=""
                title="Orders Received"
                icon={<ClipboardCheck className="h-8 w-8 text-textsecondary" />}
              />
              <StatsCard
                length=""
                title="Orders Served"
                icon={<CheckCircle className="h-8 w-8 text-textsecondary" />}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
