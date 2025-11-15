import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function MobileMenu({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out lg:hidden ${
        isMenuOpen
          ? "max-h-96 border-t border-accent/20 opacity-100"
          : "max-h-0 overflow-hidden opacity-0"
      }`}
    >
      <div className="bg-neutral/98 px-4 py-6 backdrop-blur-md">
        <ul className="mb-6 space-y-4">
          <li>
            <Link
              to="/"
              className="block rounded-lg px-4 py-3 text-base font-medium text-textdark transition-all duration-200 hover:bg-accent/10 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block rounded-lg px-4 py-3 text-base font-medium text-textdark transition-all duration-200 hover:bg-accent/10 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="block rounded-lg px-4 py-3 text-base font-medium text-textdark transition-all duration-200 hover:bg-accent/10 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Hardware
            </Link>
          </li>
          <li>
            <Link
              to="/sites"
              className="block rounded-lg px-4 py-3 text-base font-medium text-textdark transition-all duration-200 hover:bg-accent/10 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Sites
            </Link>
          </li>
        </ul>

        <div className="mb-6 flex items-center justify-center border-y border-accent/20 py-3">
          <GlobeAltIcon className="mr-2 h-4 w-4 text-textdark/70" />
          <select
            name="lang"
            aria-label="Select language"
            className="cursor-pointer appearance-none rounded-md bg-transparent px-2 py-1 text-sm font-medium text-textdark transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
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

        <div className="space-y-3">
          <Link
            to="/login"
            className="block w-full rounded-lg border border-accent/30 px-4 py-3 text-center font-medium text-textdark transition-all duration-300 hover:border-primary/50 hover:bg-accent/10 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="block w-full rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-3 text-center font-semibold text-white transition-all duration-300 hover:shadow-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up →
          </Link>
        </div>
      </div>
    </div>
  );
}
