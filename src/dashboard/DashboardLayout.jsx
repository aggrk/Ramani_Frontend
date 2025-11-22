import { Outlet } from "react-router-dom";
import UserOnly from "../auth/UserOnly";
import DashboardHeader from "./DashboardHeader";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout() {
  return (
    <UserOnly>
      <DashboardHeader />
      <Outlet />
    </UserOnly>
  );
}
