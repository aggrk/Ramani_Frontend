import { Link } from "react-router-dom";

export default function NoData({ message, linkMessage, link }) {
  return (
    <div className="mt-12 self-center">
      <p className="text-xl text-textcolor lg:text-2xl">
        {message}{" "}
        <Link
          to={link}
          className="font-semibold italic text-textsecondary underline hover:opacity-80"
        >
          {linkMessage}
        </Link>
      </p>
    </div>
  );
}
