import { useState } from "react";
import {
  ChevronDownIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-neutral/95 backdrop-blur-md border-b border-accent/20 sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img
            src="images/ramani.svg"
            alt="Ramani Logo"
            className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-transform hover:scale-105"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex gap-8 items-center">
            <li>
              <Link
                to="/"
                className="text-textdark font-medium text-base xl:text-lg group transition-all duration-300 relative py-2 hover:text-primary"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-primary to-secondary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-textdark font-medium text-base xl:text-lg group transition-all duration-300 relative py-2 hover:text-primary"
              >
                <span className="relative z-10">About</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-primary to-secondary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="text-textdark font-medium text-base xl:text-lg group transition-all duration-300 relative py-2 hover:text-primary"
              >
                <span className="relative z-10">Hardware</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-primary to-secondary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/sites"
                className="text-textdark font-medium text-base xl:text-lg group transition-all duration-300 relative py-2 hover:text-primary"
              >
                <span className="relative z-10">Sites</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-primary to-secondary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop CTA Section */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language Selector */}
          <div className="relative flex items-center pr-5 border-r border-accent/40 h-10 group">
            <GlobeAltIcon className="w-4 h-4 text-textdark/70 mr-2 group-hover:text-primary transition-colors duration-200" />
            <select
              name="lang"
              aria-label="Select language"
              className="bg-transparent text-textdark font-medium pl-1 pr-6 py-1 appearance-none cursor-pointer 
             focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md transition-all text-sm"
            >
              <option value="en" className="bg-neutral text-textdark">
                EN
              </option>
              <option value="sw" className="bg-neutral text-textdark">
                SW
              </option>
            </select>
            <ChevronDownIcon className="absolute right-1 w-3 h-3 text-textdark/70 pointer-events-none" />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-textdark hover:bg-accent/10 hover:text-primary transition-all duration-200"
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100 border-t border-accent/20"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-6 bg-neutral/98 backdrop-blur-md">
          {/* Mobile Navigation Links */}
          <ul className="space-y-4 mb-6">
            <li>
              <Link
                to="/"
                className="block text-textdark font-medium text-base py-3 px-4 rounded-lg hover:bg-accent/10 hover:text-primary transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block text-textdark font-medium text-base py-3 px-4 rounded-lg hover:bg-accent/10 hover:text-primary transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="block text-textdark font-medium text-base py-3 px-4 rounded-lg hover:bg-accent/10 hover:text-primary transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Hardware
              </Link>
            </li>
            <li>
              <Link
                to="/sites"
                className="block text-textdark font-medium text-base py-3 px-4 rounded-lg hover:bg-accent/10 hover:text-primary transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sites
              </Link>
            </li>
          </ul>

          {/* Mobile Language Selector */}
          <div className="flex items-center justify-center mb-6 py-3 border-y border-accent/20">
            <GlobeAltIcon className="w-4 h-4 text-textdark/70 mr-2" />
            <select
              name="lang"
              aria-label="Select language"
              className="bg-transparent text-textdark font-medium px-2 py-1 appearance-none cursor-pointer 
             focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md transition-all text-sm"
            >
              <option value="en" className="bg-neutral text-textdark">
                English
              </option>
              <option value="sw" className="bg-neutral text-textdark">
                Kiswahili
              </option>
            </select>
            <ChevronDownIcon className="w-3 h-3 text-textdark/70 ml-1" />
          </div>

          {/* Mobile Auth Buttons */}
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full text-center px-4 py-3 rounded-lg font-medium border border-accent/30 text-textdark 
             hover:bg-accent/10 hover:text-primary hover:border-primary/50 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="block w-full text-center px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary to-secondary text-white 
             hover:shadow-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
