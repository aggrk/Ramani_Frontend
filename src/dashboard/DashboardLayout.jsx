import { Outlet } from "react-router-dom";
import UserOnly from "../auth/UserOnly";
import DashboardHeader from "./DashboardHeader";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout() {
  const { user } = useAuth();
  const { name, role } = user?.data || {};
  return (
    <UserOnly>
      <DashboardHeader name={name} role={role} />
      <Outlet />
    </UserOnly>
  );
}
