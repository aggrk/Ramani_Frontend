import {
  CheckCircle,
  Hammer,
  HardHat,
  Plus,
  Search,
  Settings,
  UserCheck,
  UserCircle,
  UserMinus,
  UserX,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { name } = user?.data;
  const { data: userData } = useFetch("users", "/users");
  const { data: hardwareData } = useFetch(
    "hardware",
    "/hardware/getAllHardwareForAdmin",
  );
  const usersCount = userData?.data?.length || 0;
  const hardwareCount = hardwareData?.data?.hardware?.length || 0;
  const activeUsersCount =
    userData?.data?.filter((user) => user.status === "active")?.length || 0;
  const inactiveUsersCount =
    userData?.data?.filter((user) => user.status === "inactive")?.length || 0;
  const deletedUsersCount =
    userData?.data?.filter((user) => user.deletedAt)?.length || 0;
  const unapprovedShopsCount =
    hardwareData?.data?.hardware?.filter((shop) => shop.status === "pending")
      ?.length || 0;
  const approvedShopsCount =
    hardwareData?.data?.hardware?.filter((shop) => shop.status === "verified")
      ?.length || 0;

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
            <UserCheck className="h-6 w-6 text-textfooter" />
            <Link
              to="users"
              className="text-base text-textcolor hover:underline"
            >
              Users
            </Link>
          </div>
          <div className="flex gap-4">
            <HardHat className="h-6 w-6 text-textfooter" />
            <Link
              to="shops"
              className="text-base text-textcolor hover:underline"
            >
              Registered Shops
            </Link>
          </div>

          <div className="flex gap-4">
            <Plus className="h-6 w-6 text-textfooter" />
            <Link
              to="add-user"
              className="text-base text-textcolor hover:underline"
            >
              Add User
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
                length={usersCount}
                title="Registered Users"
                link={`users`}
                icon={<UserCheck className="h-5 w-5 text-textsecondary" />}
              />
              <StatsCard
                length={hardwareCount}
                title="Registered Shops"
                link="shops"
                icon={<HardHat className="h-5 w-5 text-textsecondary" />}
              />
              <StatsCard
                length={approvedShopsCount}
                title="Verified Shops"
                link="shops?status=verified"
                icon={<CheckCircle className="h-5 w-5 text-textsecondary" />}
              />
              <StatsCard
                length={activeUsersCount}
                title="Active Accounts"
                link="users?status=active"
                icon={<UserCheck className="h-5 w-5 text-textsecondary" />}
              />
              <StatsCard
                length={inactiveUsersCount}
                title="Inactive Accounts"
                link="users?status=inactive"
                icon={<UserMinus className="h-5 w-5 text-textsecondary" />}
              />
              <StatsCard
                length={deletedUsersCount}
                title="Deleted Accounts"
                link="users?deletedAt!=null"
                icon={<UserX className="h-5 w-5 text-textsecondary" />}
              />
              <StatsCard
                length={unapprovedShopsCount}
                title="Unapproved Shops"
                link="shops?status=pending"
                icon={<Hammer className="h-5 w-5 text-textsecondary" />}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    // <>
    //   <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
    //     <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
    //       <div>
    //         <h2 className="mb-1 text-2xl font-bold text-textdark sm:text-3xl">
    //           Welcome back, {name.split(" ")[0]}!
    //         </h2>
    //         <p className="text-textlight">
    //           Here's what's happening with your projects today
    //         </p>
    //       </div>
    //       <div className="relative w-full md:w-96">
    //         <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-textlight" />
    //         <input
    //           type="text"
    //           aria-label="Search sites, materials, or suppliers"
    //           placeholder="Search sites, materials, or suppliers..."
    //           className="w-full rounded-lg border border-accent/20 py-2.5 pl-10 pr-4 transition-all focus:border-primary focus:ring-2 focus:ring-primary"
    //         />
    //       </div>
    //     </div>

    //     <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    //       <StatsCard
    //         length={usersCount}
    //         title="Registered Users"
    //         link={`users`}
    //         icon={<UserCheck className="h-5 w-5" />}
    //       />
    //       <StatsCard
    //         length={hardwareCount}
    //         title="Registered Shops"
    //         link="shops"
    //         icon={<HardHat className="h-5 w-5" />}
    //       />
    //       <StatsCard
    //         length={approvedShopsCount}
    //         title="Verified Shops"
    //         link="shops?status=verified"
    //         icon={<CheckCircle className="h-5 w-5" />}
    //       />
    //       <StatsCard
    //         length={activeUsersCount}
    //         title="Active Accounts"
    //         link="users?status=active"
    //         icon={<UserCheck className="h-5 w-5" />}
    //       />
    //       <StatsCard
    //         length={inactiveUsersCount}
    //         title="Inactive Accounts"
    //         link="users?status=inactive"
    //         icon={<UserMinus className="h-5 w-5" />}
    //       />
    //       <StatsCard
    //         length={deletedUsersCount}
    //         title="Deleted Accounts"
    //         link="users?deletedAt!=null"
    //         icon={<UserX className="h-5 w-5" />}
    //       />
    //       <StatsCard
    //         length={unapprovedShopsCount}
    //         title="Unapproved Shops"
    //         link="shops?status=pending"
    //         icon={<Hammer className="h-5 w-5" />}
    //       />
    //     </div>

    //     <div className="mb-8">
    //       <div className="mb-4 flex items-center justify-between">
    //         <h3 className="text-xl font-semibold text-textdark">Actions</h3>
    //         {/* <Link
    //           to="/dashboard/actions"
    //           className="flex items-center text-sm text-primary hover:underline"
    //         >
    //           See all <ChevronRight className="ml-1 h-4 w-4" />
    //         </Link> */}
    //       </div>
    //       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    //         <QuickActionsCard
    //           link="profile"
    //           icon={<UserCircle className="h-6 w-6" />}
    //           title="My Profile"
    //         />
    //         <QuickActionsCard
    //           link="users"
    //           icon={<UserCheck className="h-6 w-6" />}
    //           title="All Users"
    //         />
    //         <QuickActionsCard
    //           link="shops"
    //           icon={<HardHat className="h-6 w-6" />}
    //           title="All Registered Shops"
    //         />
    //         <QuickActionsCard
    //           link="add-user"
    //           icon={<Plus className="h-6 w-6" />}
    //           title="Add Users"
    //         />
    //         <QuickActionsCard
    //           link="settings"
    //           icon={<SettingsIcon className="h-6 w-6" />}
    //           title="Settings"
    //         />
    //       </div>
    //     </div>
    //   </main>
    // </>
  );
}
