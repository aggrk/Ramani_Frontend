import {
  Bell,
  HardHat,
  LogOut,
  UserCircle,
  ShoppingCart,
  Edit2,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const imgUrl = import.meta.env.VITE_IMG_URL;

export default function DashboardHeader({ name, role }) {
  const [notifications] = useState(3);
  const { logout, user } = useAuth();
  const [cartItems] = useState(2);
  const { photo } = user.data;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-2">
                <HardHat className="w-5 h-5" />
              </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RAMANI
              </span>
            </h1>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Cart Button */}
            <button
              className="p-2 relative text-gray-500 hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartItems}
                </span>
              )}
            </button>

            {/* Notifications Button */}
            <button
              className="p-2 relative text-gray-500 hover:text-primary transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`flex items-center space-x-2 focus:outline-none ${
                      open ? "ring-2 ring-primary/50 rounded-full pr-2" : ""
                    }`}
                  >
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center overflow-hidden">
                        {photo && photo !== "default.jpg" ? (
                          <img
                            src={`${imgUrl}/users/${photo}`}
                            alt={name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.parentElement.innerHTML = name
                                .charAt(0)
                                .toUpperCase();
                            }}
                          />
                        ) : (
                          <span className="text-white font-medium">
                            {name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                        {name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{role}</p>
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
                    <Popover.Panel className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {name}
                        </p>
                        <p className="text-xs text-gray-500 truncate capitalize">
                          {role}
                        </p>
                      </div>
                      <div className="py-1">
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <UserCircle className="w-4 h-4 mr-2" />
                          View Profile
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </a>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={logout}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
