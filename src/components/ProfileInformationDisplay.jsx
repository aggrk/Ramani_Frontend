import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProfileInformationDisplay() {
  const { user } = useAuth();
  const { name, email, phone } = user?.data;

  return (
    <div className="rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-lg font-semibold text-[#1A1A1A] sm:text-xl lg:text-2xl">
          Personal Information
        </h2>
        <div className="h-1 w-8 rounded-full bg-[#B22222] sm:w-10 md:w-12"></div>
      </div>
      <Link
        to="update/name"
        className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-neutral px-4 py-2"
      >
        <h3 htmlFor="name" className="">
          Full Name
        </h3>
        <p className="text- text-light text-sm opacity-50">{name}</p>
      </Link>
      <Link
        to="update/email"
        className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-neutral px-4 py-2"
      >
        <label htmlFor="email" className="">
          Email Address
        </label>
        <p className="text- text-light text-sm opacity-50">{email}</p>
      </Link>
      <Link
        to="update/phone"
        className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-neutral px-4 py-2"
      >
        <label htmlFor="phone" className="">
          Phone Number
        </label>
        <p className="text- text-light text-sm opacity-50">{phone}</p>
      </Link>
    </div>
  );
}
