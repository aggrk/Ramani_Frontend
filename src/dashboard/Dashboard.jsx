import { useAuth } from "../hooks/useAuth";
import UserDashboard from "./user/UserDashboard";
import EngineerDashboard from "./site/EngineerDashboard";
import HardwareDashboard from "./hardware/HardwareDashboard";
import AdminDashboard from "./admin/AdminDashboard";

export default function Dashboard() {
  const { user } = useAuth();
  const { role } = user.data;

  return (
    <div className="bg-bgcolor flex min-h-screen flex-col">
      {role === "user" && <UserDashboard />}
      {role === "engineer" && <EngineerDashboard />}
      {role === "hardware dealer" && <HardwareDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}
