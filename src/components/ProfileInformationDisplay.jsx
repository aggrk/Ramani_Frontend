import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProfileInformationDisplay() {
  const { user } = useAuth();
  const { name, email, phone } = user?.data;

  return (
    <div className="rounded-xl bg-bgfooter p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-textcolor sm:mb-6 sm:text-xl lg:text-2xl">
        Personal Information
      </h2>
      <Link
        to="update/name"
        className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-textcolor px-4 py-2"
      >
        <h3 htmlFor="name" className="text-bgfooter">
          Full Name
        </h3>
        <p className="text- text-sm text-bgcolor opacity-80">{name}</p>
      </Link>
      <Link
        to="update/email"
        className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-textcolor px-4 py-2"
      >
        <label htmlFor="email" className="text-bgfooter">
          Email Address
        </label>
        <p className="text-sm text-bgcolor opacity-80">{email}</p>
      </Link>
      <Link
        to="update/phone"
        className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-textcolor px-4 py-2"
      >
        <label htmlFor="phone" className="text-bgfooter">
          Phone Number
        </label>
        <p className="text-sm text-bgcolor opacity-80">{phone}</p>
      </Link>
    </div>
  );
}
