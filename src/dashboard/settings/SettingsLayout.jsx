import {
  Accessibility,
  Bell,
  ChevronDown,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function SettingsLayout() {
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [openSecurityMenu, setOpenSecurityMenu] = useState(false);

  const [showSidebar, setShowSidebar] = useState(true);

  const linkClasses = ({ isActive }) =>
    `hover:text-textsecondary hover:underline ${
      isActive ? "text-textsecondary font-semibold underline" : "text-textcolor"
    }`;

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex min-h-screen w-full gap-x-12">
        <div
          className={`flex h-screen w-full flex-col border-textcolor/20 py-2 md:w-1/4 md:border-r-2 ${
            showSidebar ? "block" : "hidden md:block"
          }`}
        >
          <div className="border-b-2 border-textcolor/20 pb-2 pt-6">
            <button
              onClick={() => setOpenAccountMenu(!openAccountMenu)}
              className="flex w-full items-center justify-between pr-2 text-textcolor hover:text-textsecondary hover:underline"
            >
              <span className="flex items-center gap-x-2">
                <span className="rounded-xl p-2">
                  <UserCircle className="h-6 w-6 text-textsecondary" />
                </span>
                My Account
              </span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openAccountMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {openAccountMenu && (
              <div className="ml-12 mt-3 flex flex-col gap-y-2">
                <NavLink
                  to="/dashboard/settings"
                  end
                  className={({ isActive }) =>
                    `hover:text-textsecondary hover:underline ${
                      isActive
                        ? "font-semibold text-textsecondary underline"
                        : "text-textcolor"
                    }`
                  }
                  onClick={() => setShowSidebar(false)}
                >
                  Edit Profile
                </NavLink>

                <NavLink
                  to="change-password"
                  className={linkClasses}
                  onClick={() => setShowSidebar(false)}
                >
                  Change Password
                </NavLink>

                <NavLink
                  to="delete-account"
                  className={linkClasses}
                  onClick={() => setShowSidebar(false)}
                >
                  Delete Account
                </NavLink>
              </div>
            )}
          </div>

          <div className="border-b-2 border-textcolor/20 pb-2 pt-6">
            <button
              onClick={() => setOpenSecurityMenu(!openSecurityMenu)}
              className="flex w-full items-center justify-between pr-2 text-textcolor hover:text-textsecondary hover:underline"
            >
              <span className="flex items-center gap-x-2">
                <span className="rounded-xl p-2">
                  <ShieldCheck className="h-6 w-6 text-textsecondary" />
                </span>
                Security
              </span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSecurityMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSecurityMenu && (
              <div className="ml-12 mt-3 flex flex-col gap-y-2">
                <NavLink
                  to="two-factor"
                  className={linkClasses}
                  onClick={() => setShowSidebar(false)}
                >
                  Two Factor Authentication
                </NavLink>
              </div>
            )}
          </div>

          <div className="border-b-2 border-textcolor/20 pb-2 pt-6">
            <NavLink
              to="notifications"
              className={linkClasses}
              onClick={() => setShowSidebar(false)}
            >
              <span className="flex items-center gap-x-2">
                <span className="rounded-xl p-2">
                  <Bell className="h-6 w-6 text-textsecondary" />
                </span>
                Notifications
              </span>
            </NavLink>
          </div>

          <div className="border-b-2 border-textcolor/20 pb-2 pt-6">
            <NavLink
              to="accessibility"
              className={linkClasses}
              onClick={() => setShowSidebar(false)}
            >
              <span className="flex items-center gap-x-2">
                <span className="rounded-xl p-2">
                  <Accessibility className="h-6 w-6 text-textsecondary" />
                </span>
                Accessibility
              </span>
            </NavLink>
          </div>
        </div>

        <div
          className={`h-full w-full md:w-3/4 ${
            showSidebar ? "hidden md:block" : "block"
          }`}
        >
          {!showSidebar && (
            <button
              onClick={() => setShowSidebar(true)}
              className="hover:textsecodary mb-4 inline-block text-textcolor underline md:hidden"
            >
              Back to Settings Menu
            </button>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
}
