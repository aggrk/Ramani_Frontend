import DashboardHeaderPopover from "../components/DashboardHeaderPopover";
import NotificationButton from "../components/NotificationButton";
import CartButton from "../components/CartButton";
import LogoSection from "../components/LogoSection";
import DashboardMobileMenu from "./DashboardMobileMenu";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-textcolor/10 bg-bgcolor shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(true)}>
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-textcolor" />
                ) : (
                  <Menu className="h-5 w-5 text-textcolor" />
                )}
              </button>
            </div>

            <div className="hidden md:block">
              <LogoSection />
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5">
            <CartButton />
            <NotificationButton />
            <DashboardHeaderPopover />
          </div>
        </div>
      </div>
      <DashboardMobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </header>
  );
}
