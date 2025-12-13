import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { imageUrl } from "../utils/utils";
import { useAuth } from "../hooks/useAuth";
import { Edit2, LogOut, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardHeaderPopover() {
  const { logout, user } = useAuth();
  const { photo, name, role } = user.data;

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex items-center space-x-2 focus:outline-none ${
              open ? "ring-textsecondary rounded-full pr-2 ring-2" : ""
            }`}
          >
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent">
                {photo && photo !== "default.jpg" ? (
                  <img
                    src={`${imageUrl}/users/${photo}`}
                    alt={name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = name
                        .charAt(0)
                        .toUpperCase();
                    }}
                  />
                ) : (
                  <span className="font-medium text-white">
                    {name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
            </div>
            <div className="hidden text-left md:block">
              <p className="text-textcolor max-w-[120px] truncate text-sm font-medium">
                {name}
              </p>
              <p className="text-textsecondary text-xs capitalize">{role}</p>
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="ring-bgcolor divide-bgcolor/25 bg-textcolor absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none">
              <div className="px-4 py-3">
                <p className="text-bgcolor text-sm font-medium">{name}</p>
                <p className="text-bgcolor/75 truncate text-xs capitalize">
                  {role}
                </p>
              </div>
              <div className="py-1">
                <Link
                  to="profile"
                  className="text-bgcolor flex items-center px-4 py-2 text-sm"
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
                <Link
                  to="settings"
                  className="text-bgcolor flex items-center px-4 py-2 text-sm"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </div>
              <div className="py-1">
                <button
                  onClick={logout}
                  className="flex w-full items-center px-4 py-2 text-sm text-primary hover:bg-gray-100"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
