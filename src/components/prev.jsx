import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-neutral border-b border-accent">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <img
              src="images/logo.svg"
              alt="Ramani Logo"
              className="h-14 w-auto object-contain transition-transform hover:scale-105"
            />
          </div>

          {/* Main Navigation with improved styling */}
          <ul className="flex gap-8 items-center">
            <li>
              <Link
                to="/"
                className="text-textdark font-medium text-lg group transition-all duration-300 relative py-2"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-textdark font-medium text-lg group transition-all duration-300 relative py-2"
              >
                <span className="relative z-10">About</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="text-textdark font-medium text-lg group transition-all duration-300 relative py-2"
              >
                <span className="relative z-10">Hardware</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/sites"
                className="text-textdark font-medium text-lg group transition-all duration-300 relative py-2"
              >
                <span className="relative z-10">Sites</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <div className="relative flex items-center pr-5 border-r border-accent/60 h-10 group">
            <GlobeAltIcon className="w-5 h-5 text-textdark opacity-80 mr-2 group-hover:text-primary transition-colors duration-200" />

            <select
              name="lang"
              aria-label="Select language"
              className="bg-transparent text-textdark font-medium pl-1 pr-6 py-1 appearance-none cursor-pointer 
                 focus:outline-none focus:ring-2 focus:ring-primary/60 rounded-md transition-all"
            >
              <option
                value="en"
                className="bg-neutral text-center text-textdark"
              >
                EN
              </option>
              <option value="sw" className="bg-neutral text-textdark">
                SW
              </option>
            </select>

            <ChevronDownIcon className="absolute right-1 w-4 h-4 text-textdark pointer-events-none" />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-lg font-medium border border-textdark/30 text-textdark 
                 hover:text-primary hover:border-primary transition-all duration-300 shadow-sm"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg font-semibold bg-primary text-white 
                 hover:bg-secondary transition duration-300 shadow-md hover:shadow-lg flex items-center group"
            >
              Sign Up
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
