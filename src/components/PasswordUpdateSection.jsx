import { useState } from "react";
import UpdatePassword from "../dashboard/user/UpdatePassword";

export default function PasswordUpdateSection() {
  const [updatePassword, setUpdatePassword] = useState(false);

  return (
    <div className="rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-lg font-semibold text-[#1A1A1A] sm:text-xl lg:text-2xl">
          Password & Security
        </h2>
        <div className="h-1 w-8 rounded-full bg-[#556B2F] sm:w-10 md:w-12"></div>
      </div>
      {updatePassword ? (
        <UpdatePassword setUpdatePassword={setUpdatePassword} />
      ) : (
        <div className="space-y-4 sm:space-y-5">
          <p className="text-sm text-[#555] sm:text-base lg:text-lg">
            For security reasons, we recommend changing your password regularly.
            Ensure it's strong and unique to protect your account.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setUpdatePassword(true)}
              className="rounded-lg border border-[#B22222] bg-transparent px-4 py-2 text-sm font-medium text-[#B22222] shadow-sm transition-all duration-300 hover:bg-[#FFF0F0] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:ring-opacity-50 sm:px-6 sm:py-3 sm:text-base lg:text-lg"
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
