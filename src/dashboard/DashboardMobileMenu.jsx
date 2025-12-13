import { HardHat, Plus, SettingsIcon, UserCircle, X } from "lucide-react";
import QuickActionsCard from "../components/QuickActionsCard";
import LogoSection from "../components/LogoSection";
import { useAuth } from "../hooks/useAuth";
import UserMobileMenuList from "./UserMobileMenuList";
import EngineerMobileMenuList from "./EngineerMobileMenuList";
import DealerMobileMenuList from "./DealerMobileMenuList";
import AdminMobileMenuList from "./AdminMobileMenuList";

export default function DashboardMobileMenu({ isMenuOpen, setIsMenuOpen }) {
  let { user } = useAuth();
  let { role } = user?.data;
  const onClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-bgcolor/95 p-6 backdrop-blur-lg">
          <div className="mb-6 flex justify-between">
            <LogoSection />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold text-textsecondary hover:text-primary"
            >
              <X className="h-6 w-6 text-textcolor" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {role === "user" && <UserMobileMenuList onClick={onClick} />}
            {role === "engineer" && (
              <EngineerMobileMenuList onClick={onClick} />
            )}
            {role === "hardware dealer" && (
              <DealerMobileMenuList onClick={onClick} />
            )}
            {role === "admin" && <AdminMobileMenuList onClick={onClick} />}
          </div>
        </div>
      )}
    </>
  );
}
