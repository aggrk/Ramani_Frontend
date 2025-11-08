import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import ActivityIndicator from "../../components/ActivityIndicator";
import { useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function UpdateAccountDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const { handleSubmit, register } = useForm();
  const { name, email, phone } = user?.data;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await api.patch(`users/updateMe`, data);
      if (res.data.status && res.status)
        toast.success("Profile updated successfully!");
      setUser(res.data);
    } catch (err) {
      // console.log(err.response.data.message);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <div className="flex w-full flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              defaultValue={name}
              {...register("name", { required: true })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue={email}
              {...register("email", { required: true })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              defaultValue={phone}
              {...register("phone", { required: true })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#B22222] py-2 font-medium text-white transition hover:bg-[#9b1c1c] active:scale-[0.98]"
          >
            {isLoading ? (
              <ActivityIndicator size="xs" className="border-white" />
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
