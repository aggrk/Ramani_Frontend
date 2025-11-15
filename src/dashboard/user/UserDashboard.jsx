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
import QuickActionsCard from "../../components/QuickActionsCard";
import api from "../../utils/api";
import StatsCard from "../../components/StatsCard";
import useFetch from "../../hooks/useFetch";

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

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          link="applications"
          title="My Applications"
          icon={<FileText className="h-5 w-5 text-secondary" />}
          length={applications.length}
          extraStyle="secondary"
        />
        <StatsCard
          link="approved-applications"
          title="Approved Jobs"
          icon={<CheckCircle className="h-5 w-5 text-secondary" />}
          length={approvedCount}
          extraStyle="secondary"
        />
        <StatsCard
          link=""
          title="Pending Deliveries"
          icon={<Truck className="h-5 w-5 text-secondary" />}
          length=""
          extraStyle="secondary"
        />
        <StatsCard
          link="pending-applications"
          title="Pending Jobs"
          icon={
            <CircleDotDashed className="h-5 w-5 animate-spin text-secondary" />
          }
          length={unapprovedCount}
          extraStyle="secondary"
        />
        <StatsCard
          link="rejected-applications"
          title="Rejected Applications"
          icon={<XCircle className="h-5 w-5" />}
          length={rejectedCount}
        />
      </div>

      <div className="mb-10">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold tracking-tight text-textdark">
            Quick Actions
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <QuickActionsCard
            link="profile"
            icon={<UserCircle className="h-6 w-6" />}
            title="My Profile"
          />
          <QuickActionsCard
            link="sites"
            icon={<Building className="h-6 w-6" />}
            title="Find a Job"
          />
          <QuickActionsCard
            link="hardware"
            icon={<HardHat className="h-6 w-6" />}
            title="Shop"
          />
          <QuickActionsCard
            link="applications"
            icon={<FileText className="h-6 w-6" />}
            title="My Applications"
          />
          <QuickActionsCard
            link=""
            icon={<Heart className="h-6 w-6 fill-primary" />}
            title="Products in Wishlist"
          />
          <QuickActionsCard
            link=""
            icon={<Star className="h-6 w-6 fill-primary" />}
            title="Favorite Hardware"
          />
          <QuickActionsCard
            link="settings"
            icon={<Settings className="h-6 w-6" />}
            title="Settings"
          />
        </div>
      </div>
    </main>
  );
}
