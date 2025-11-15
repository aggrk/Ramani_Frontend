import DashboardHeaderPopover from "../components/DashboardHeaderPopover";
import NotificationButton from "../components/NotificationButton";
import CartButton from "../components/CartButton";
import LogoSection from "../components/LogoSection";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <LogoSection />

          <div className="flex items-center space-x-3 sm:space-x-5">
            <CartButton />
            <NotificationButton />
            <DashboardHeaderPopover />
          </div>
        </div>
      </div>
    </header>
  );
}
