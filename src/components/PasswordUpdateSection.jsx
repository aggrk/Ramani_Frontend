import { useState } from "react";
import UpdatePassword from "../dashboard/user/UpdatePassword";

export default function PasswordUpdateSection() {
  const [updatePassword, setUpdatePassword] = useState(false);

  return (
    <div className="rounded-xl bg-bgfooter p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-textcolor sm:mb-6 sm:text-xl lg:text-2xl">
        Password & Security
      </h2>
      {updatePassword ? (
        <UpdatePassword setUpdatePassword={setUpdatePassword} />
      ) : (
        <div className="space-y-4 sm:space-y-5">
          <p className="text-sm text-textcolor sm:text-base lg:text-lg">
            For security reasons, we recommend changing your password regularly.
            Ensure it's strong and unique to protect your account.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setUpdatePassword(true)}
              className="rounded-lg border border-textcolor bg-transparent px-4 py-2 text-sm font-medium text-textcolor shadow-sm transition-all duration-300 hover:bg-textfooter hover:text-bgfooter hover:shadow-md focus:outline-none focus:ring-2 focus:ring-textfooter focus:ring-opacity-50 sm:px-6 sm:py-3 sm:text-base lg:text-lg"
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
