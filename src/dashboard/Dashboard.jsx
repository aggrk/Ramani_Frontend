import { useState } from "react";
import {
  UserCircle,
  HardHat,
  Truck,
  Calendar,
  Bell,
  Search,
  FileText,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { engineerActions, hardwareActions, userActions } from "../utils/data";
import UserDashboard from "./user/UserDashboard";
import EngineerDashboard from "./site/EngineerDashboard";
import HardwareDashboard from "./hardware/HardwareDashboard";

export default function Dashboard() {
  const { user } = useAuth();
  const { role } = user.data;

  return (
    <div className="flex min-h-screen flex-col bg-neutral/5">
      {role === "user" && <UserDashboard />}
      {role === "engineer" && <EngineerDashboard />}
      {role === "hardware dealer" && <HardwareDashboard />}
    </div>
  );
}
