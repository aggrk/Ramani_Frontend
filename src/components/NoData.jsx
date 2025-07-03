import { Link } from "react-router-dom";

export default function NoData({ message, linkMessage, link }) {
  return (
    <div className="mt-12 self-center">
      <p className="text-xl text-[#781717] lg:text-2xl">
        {message}{" "}
        <Link to={link} className="font-semibold italic underline">
          {linkMessage}
        </Link>
      </p>
    </div>
  );
}
