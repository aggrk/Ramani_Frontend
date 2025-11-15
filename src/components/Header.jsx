import { useState } from "react";
import {
  ChevronDownIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import LogoSection from "./LogoSection";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-accent/20 bg-neutral/95 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <LogoSection />

        <div className="hidden items-center gap-12 lg:flex">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="group relative py-2 text-base font-medium text-textdark transition-all duration-300 hover:text-primary xl:text-lg"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform rounded-full bg-gradient-to-r from-primary to-secondary transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="group relative py-2 text-base font-medium text-textdark transition-all duration-300 hover:text-primary xl:text-lg"
              >
                <span className="relative z-10">About</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform rounded-full bg-gradient-to-r from-primary to-secondary transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="group relative py-2 text-base font-medium text-textdark transition-all duration-300 hover:text-primary xl:text-lg"
              >
                <span className="relative z-10">Hardware</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform rounded-full bg-gradient-to-r from-primary to-secondary transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/sites"
                className="group relative py-2 text-base font-medium text-textdark transition-all duration-300 hover:text-primary xl:text-lg"
              >
                <span className="relative z-10">Sites</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform rounded-full bg-gradient-to-r from-primary to-secondary transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="group relative flex h-10 items-center border-r border-accent/40 pr-5">
            <GlobeAltIcon className="mr-2 h-4 w-4 text-textdark/70 transition-colors duration-200 group-hover:text-primary" />
            <select
              name="lang"
              aria-label="Select language"
              className="cursor-pointer appearance-none rounded-md bg-transparent py-1 pl-1 pr-6 text-sm font-medium text-textdark transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="en" className="bg-neutral text-textdark">
                EN
              </option>
              <option value="sw" className="bg-neutral text-textdark">
                SW
              </option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-1 h-3 w-3 text-textdark/70" />
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg border border-textdark/30 px-5 py-2.5 font-medium text-textdark shadow-sm transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="group flex items-center rounded-lg bg-primary px-5 py-2.5 font-semibold text-white shadow-md transition duration-300 hover:bg-secondary hover:shadow-lg"
            >
              Sign Up
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-textdark transition-all duration-200 hover:bg-accent/10 hover:text-primary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}
