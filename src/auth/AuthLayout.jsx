import { Outlet } from "react-router-dom";
import GuestOnly from "./GuestOnly";

export default function AuthLayout() {
  return (
    <GuestOnly>
      <Outlet />
    </GuestOnly>
  );
}
