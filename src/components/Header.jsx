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
import { motion } from "motion/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      // initial={{ opacity: 0, y: -6 }}
      // animate={{ opacity: 1, y: 6 }}
      // transition={{ duration: 0.8 }}
      className="sticky top-0 z-50 w-full border-b border-textsecondary border-opacity-25 bg-bgcolor backdrop-blur-md"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <div className="flex gap-12">
          <LogoSection />
          <div className="hidden items-center gap-12 lg:flex">
            <ul className="flex items-center gap-8">
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link
                  to="/"
                  className="group relative py-2 text-base font-medium text-textcolor transition-all duration-300 hover:text-textsecondary xl:text-lg"
                >
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link
                  to="/about"
                  className="group relative py-2 text-base font-medium text-textcolor transition-all duration-300 hover:text-textsecondary xl:text-lg"
                >
                  About
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link
                  to="/projects"
                  className="group relative py-2 text-base font-medium text-textcolor transition-all duration-300 hover:text-textsecondary xl:text-lg"
                >
                  Shops
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link
                  to="/sites"
                  className="group relative py-2 text-base font-medium text-textcolor transition-all duration-300 hover:text-textsecondary xl:text-lg"
                >
                  Sites
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="group relative flex h-10 items-center border-r border-textsecondary border-opacity-50 pr-5">
            <GlobeAltIcon className="mr-2 h-4 w-4 text-textcolor transition-colors duration-200 group-hover:text-textsecondary" />
            <select
              name="lang"
              aria-label="Select language"
              className="cursor-pointer appearance-none rounded-md bg-transparent py-1 pl-1 pr-6 text-sm font-medium text-textcolor transition-all focus:outline-none focus:ring-2 focus:ring-textsecondary"
            >
              <option value="en" className="bg-bgcolor text-textcolor">
                EN
              </option>
              <option value="sw" className="bg-bgcolor text-textcolor">
                SW
              </option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-1 h-3 w-3 text-textcolor" />
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.9, y: 1 }}
            >
              <Link
                to="/login"
                className="rounded-lg border border-textsecondary px-5 py-2.5 font-medium text-textcolor shadow-sm transition-all duration-300"
              >
                Log In
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.9, y: 1 }}
            >
              <Link
                to="/register"
                className="items-center rounded-lg bg-textsecondary px-5 py-2.5 text-bgcolor shadow-md transition duration-300 hover:shadow-lg"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-textcolor transition-all duration-200 hover:bg-textcolor hover:text-bgcolor"
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
    </motion.header>
  );
}
