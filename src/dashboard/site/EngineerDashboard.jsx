import {
  Building,
  Calendar,
  FileText,
  HardHat,
  PlusCircle,
  Settings,
  Star,
  Truck,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useCartItems from "../../hooks/useCartItems";
import useFetch from "../../hooks/useFetch";
import StatsCard from "../../components/StatsCard";

export default function EngineerDashboard() {
  const { user } = useAuth();
  const { name } = user.data;
  const { cartItems } = useCartItems();
  const { data } = useFetch("receivedApplications", "applications/my");
  const applications = data?.data?.applications;

  return (
    <>
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
                My Sites
              </Link>
            </div>
            <div className="flex gap-4">
              <FileText className="h-6 w-6 text-textfooter" />
              <Link
                to="received-applications"
                className="text-base text-textcolor hover:underline"
              >
                Applications
              </Link>
            </div>
            <div className="flex gap-4">
              <PlusCircle className="h-6 w-6 text-textfooter" />
              <Link
                to="add-site"
                className="text-base text-textcolor hover:underline"
              >
                Add Site
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
                  length={applications?.length}
                  title="Applications"
                  link="received-applications"
                  icon={<FileText className="h-8 w-8 text-textsecondary" />}
                />
                <StatsCard
                  length={cartItems?.data?.length}
                  title="Hardware Orders"
                  link=""
                  icon={<HardHat className="h-8 w-8 text-textsecondary" />}
                />
                <StatsCard
                  length={5}
                  title="Pending Deliveries"
                  link=""
                  icon={<Truck className="h-8 w-8 text-textsecondary" />}
                />
                <StatsCard
                  length={7}
                  title="Upcoming Tasks"
                  link=""
                  icon={<Calendar className="h-8 w-8 text-textsecondary" />}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
