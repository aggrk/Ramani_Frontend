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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="currentPassword"
          className="text-sm font-medium text-gray-700"
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
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-primary/40"
        />
        {errors.currentPassword && (
          <p className="text-xs text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-gray-700"
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
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-primary/40"
          />
          {errors.newPassword && (
            <p className="text-xs text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
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
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-primary/40"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-4 sm:justify-end">
        <button
          type="button"
          onClick={() => setUpdatePassword(false)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-[#556B2F] px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#465827] active:scale-[0.98]"
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
