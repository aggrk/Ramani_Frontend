import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function MobileMenu({ isMenuOpen, setIsMenuOpen }) {
  return (
    <>
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="fixed inset-x-0 top-16 z-50 h-screen border-t border-textcolor/20 bg-bgfooter px-4 pb-6 pt-4 shadow-xl backdrop-blur-md">
            <ul className="mb-4 space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-textcolor"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-textcolor"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-textcolor"
                >
                  Hardware
                </Link>
              </li>

              <li>
                <Link
                  to="/sites"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-textcolor"
                >
                  Sites
                </Link>
              </li>
            </ul>

            <div className="mb-4 flex items-center justify-center border-y border-textcolor/20 py-3">
              <GlobeAltIcon className="text-textmobile mr-2 h-4 w-4" />
              <select
                name="lang"
                aria-label="Select language"
                className="cursor-pointer rounded-md bg-transparent px-2 py-1 text-sm font-medium text-textcolor focus:outline-none focus:ring-2 focus:ring-textcolor"
              >
                <option value="en" className="text-textdark bg-neutral">
                  English
                </option>
                <option value="sw" className="text-textdark bg-neutral">
                  Kiswahili
                </option>
              </select>
              <ChevronDownIcon className="ml-1 h-3 w-3 text-bgcolor" />
            </div>

            <div className="space-y-3">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-lg border border-textcolor px-4 py-3 text-center font-medium text-textcolor"
              >
                Log In
              </Link>

              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-lg bg-textcolor px-4 py-3 text-center font-semibold text-bgcolor transition hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
