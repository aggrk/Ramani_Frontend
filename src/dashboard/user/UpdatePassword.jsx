import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import toast from "react-hot-toast";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function UpdatePassword({ setUpdatePassword }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await api.patch("users/updateMyPassword", data);
      // console.log(res.data);
      if (res.data.status && res.status)
        toast.success("Password Updated succesfully");
    } catch (err) {
      // console.log(err.response.data.message);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
      <div>
        <label
          htmlFor="currentPassword"
          className="mb-1 block text-xs font-medium text-[#555] sm:mb-2 sm:text-sm lg:text-base"
        >
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          placeholder="••••••••"
          {...register("currentPassword", {
            required: "Please enter your current password",
          })}
          className="w-full rounded-lg border border-[#E8D9C5] px-3 py-2 text-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#B22222] sm:px-4 sm:py-3 sm:text-base lg:text-lg"
        />
        {errors.currentPassword && (
          <p className="mt-1 text-xs text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        <div>
          <label
            htmlFor="newPassword"
            className="mb-1 block text-xs font-medium text-[#555] sm:mb-2 sm:text-sm lg:text-base"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="••••••••"
            {...register("newPassword", {
              required: "Please enter the new password",
            })}
            className="w-full rounded-lg border border-[#E8D9C5] px-3 py-2 text-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#B22222] sm:px-4 sm:py-3 sm:text-base lg:text-lg"
          />
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-xs font-medium text-[#555] sm:mb-2 sm:text-sm lg:text-base"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            className="w-full rounded-lg border border-[#E8D9C5] px-3 py-2 text-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#B22222] sm:px-4 sm:py-3 sm:text-base lg:text-lg"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-3 sm:space-x-4">
        <button
          type="button"
          onClick={() => setUpdatePassword(false)}
          className="rounded-lg border border-[#E8D9C5] bg-transparent px-4 py-2 text-sm font-medium text-[#555] transition-all duration-300 hover:bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#E8D9C5] sm:px-6 sm:py-3 sm:text-base lg:text-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-[#556B2F] px-4 py-2 text-xs font-medium text-white shadow-md transition-all duration-300 hover:bg-[#465827] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:ring-opacity-50 sm:px-6 sm:py-3 sm:text-base lg:text-lg"
        >
          {isLoading ? (
            <ActivityIndicator size="xs" className="border-white" />
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </form>
  );
}
