import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import ActivityIndicator from "../../components/ActivityIndicator";
import api from "../../utils/api";
import Success from "../../components/Success";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { field } = useParams();
  const { user, setUser } = useAuth();
  const { name, email, phone } = user?.data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fieldLabel =
    {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
    }[field] || "Unknown Field";

  let value;
  if (field === "name") value = name;
  if (field === "email") value = email;
  if (field === "phone") value = phone;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await api.patch(`users/updateMe`, data);
      if (res.data.status && res.status)
        toast.success(
          `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`,
        );
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-xl font-bold uppercase">
          Update {fieldLabel}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label className="text-sm font-semibold sm:text-lg">
            {fieldLabel}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            defaultValue={value}
            {...register(field, { required: true })}
            className="w-full rounded-md border px-3 py-2 sm:w-full md:w-1/2 lg:w-1/3"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-[#B22222] py-2 text-white hover:bg-[#d33] md:w-1/2 lg:w-1/3"
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
