import { Eye, EyeOff } from "lucide-react";
import ActivityIndicator from "../../components/ActivityIndicator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ErrorMessage } from "@hookform/error-message";
import api from "../../utils/api";
import { motion } from "motion/react";

export default function AddUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      await api.post("/users", data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([{ queryKey: "users" }]);
      toast.success("User updated succesfully");
    },
    onError: (err) =>
      toast.error(err.response.data.message || "Failed to updated user"),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold uppercase text-textcolor">
          Add User
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-textcolor"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "The name is required" })}
              className="mt-1 rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-warning">{message}</p>
              )}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-textcolor"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="text-warning">{message}</p>
              )}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm font-semibold text-textcolor"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              {...register("phone", {
                pattern: {
                  value: /^(0|\+255)[0-9]{9}$/,
                  message: "Must start with 0 or +255 followed by 9 digits",
                },
                validate: (value) => {
                  const cleanValue = value.replace(/\s/g, "");
                  return (
                    /^(0|\+255)[0-9]{9}$/.test(cleanValue) ||
                    "Invalid phone number format"
                  );
                },
              })}
              className="mt-1 rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => (
                <p className="text-warning">{message}</p>
              )}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-textcolor"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="mt-1 w-full rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none focus:ring-2 focus:ring-bgfooter"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-warning">{message}</p>
                )}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-textcolor transition-colors hover:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-textcolor"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="mt-1 w-full rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
              />
              <ErrorMessage
                errors={errors}
                name="confirmPassword"
                render={({ message }) => (
                  <p className="text-warning">{message}</p>
                )}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-textcolor transition-colors hover:text-primary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-end">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9, y: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              type="submit"
              className="w-full rounded-md bg-textsecondary py-2 font-semibold text-bgcolor"
            >
              {mutation.isPending ? (
                <ActivityIndicator size="xs" />
              ) : (
                "Add User"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
