import {
  Accessibility,
  Bell,
  ChevronDown,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [openSecurityMenu, setOpenSecurityMenu] = useState(false);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex min-h-screen w-full gap-x-4">
        <div className="flex h-full w-full flex-col py-2 md:w-1/4 md:border-r-2">
          <div className="border-b-2 border-textdark/10 pb-2 pt-6">
            <button
              onClick={() => setOpenAccountMenu(!openAccountMenu)}
              className="flex w-full items-center justify-between gap-x-2 font-semibold text-primary hover:underline"
            >
              <span className="flex items-center gap-x-2">
                <span className="rounded-xl bg-primary/10 p-2">
                  <UserCircle className="h-6 w-6 text-primary" />
                </span>
                <span>My Account</span>
              </span>

              <ChevronDown
                className={`h-5 w-5 transition-transform ${openAccountMenu ? "rotate-180" : ""}`}
              />
            </button>

            {openAccountMenu && (
              <div className="ml-12 mt-3 flex flex-col gap-y-2 text-textlight">
                <Link to="" className="hover:text-primary hover:underline">
                  Edit Profile
                </Link>

                <Link to="" className="hover:text-primary hover:underline">
                  Change Password
                </Link>

                <Link to="" className="hover:text-primary hover:underline">
                  Delete Account
                </Link>
              </div>
            )}
          </div>

          <div className="border-b-2 border-textdark/10 pb-2 pt-6">
            <button
              onClick={() => setOpenSecurityMenu(!openSecurityMenu)}
              className="flex w-full items-center justify-between gap-x-2 font-semibold text-primary hover:underline"
            >
              <span className="flex items-center gap-x-2">
                <span className="rounded-xl bg-primary/10 p-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </span>
                <span>Security</span>
              </span>

              <ChevronDown
                className={`h-5 w-5 transition-transform ${openSecurityMenu ? "rotate-180" : ""}`}
              />
            </button>
            {openSecurityMenu && (
              <div className="ml-12 mt-3 flex flex-col gap-y-2 text-textlight">
                <Link to="" className="hover:text-primary hover:underline">
                  Two Factor Authentication
                </Link>
              </div>
            )}
          </div>
          <div className="border-b-2 border-textdark/10 pb-2 pt-6">
            <Link
              to=""
              className="flex items-center gap-x-2 font-semibold text-primary hover:underline"
            >
              <span className="rounded-xl bg-primary/10 p-2">
                <Bell className="h-6 w-6 text-primary" />
              </span>
              <span>Notifications</span>
            </Link>
          </div>
          <div className="border-b-2 border-textdark/10 pb-2 pt-6">
            <Link
              to=""
              className="flex items-center gap-x-2 font-semibold text-primary hover:underline"
            >
              <span className="rounded-xl bg-primary/10 p-2">
                <Accessibility className="h-6 w-6 text-primary" />
              </span>
              <span>Accessibility</span>
            </Link>
          </div>
        </div>
        <div className="hidden h-full w-3/4 border border-yellow-900 md:block"></div>
      </div>
    </div>
  );
}
