import { Link } from "react-router-dom";

export default function LogoSection() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link to="/">
        <img
          src="images/logo.png"
          alt="Ramani Logo"
          className="h-8 w-auto object-contain transition-transform hover:scale-105 md:h-10"
        />
      </Link>
    </div>
  );
}
