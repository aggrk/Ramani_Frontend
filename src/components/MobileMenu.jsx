import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function MobileMenu({ isMenuOpen, setIsMenuOpen }) {
  return (
    <>
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="fixed inset-x-0 top-16 z-50 border-t border-accent/20 bg-bgmobile px-4 pb-6 pt-4 shadow-xl backdrop-blur-md">
            {/* Navigation links */}
            <ul className="mb-4 space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-textmobile transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-textmobile transition"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-textmobile transition"
                >
                  Hardware
                </Link>
              </li>

              <li>
                <Link
                  to="/sites"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-textmobile transition"
                >
                  Sites
                </Link>
              </li>
            </ul>

            {/* Language selector */}
            <div className="mb-4 flex items-center justify-center border-y border-accent/20 py-3">
              <GlobeAltIcon className="mr-2 h-4 w-4 text-textmobile" />
              <select
                name="lang"
                aria-label="Select language"
                className="cursor-pointer rounded-md bg-transparent px-2 py-1 text-sm font-medium text-textmobile focus:outline-none focus:ring-2 focus:ring-textmobile"
              >
                <option value="en" className="bg-neutral text-textdark">
                  English
                </option>
                <option value="sw" className="bg-neutral text-textdark">
                  Kiswahili
                </option>
              </select>
              <ChevronDownIcon className="ml-1 h-3 w-3 text-textdark/70" />
            </div>

            {/* Auth buttons */}
            <div className="space-y-3">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-lg border border-textmobile px-4 py-3 text-center font-medium text-textmobile"
              >
                Log In
              </Link>

              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-lg bg-primary px-4 py-3 text-center font-semibold text-white transition hover:shadow-lg"
              >
                Sign Up →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
