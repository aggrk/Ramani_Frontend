import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import Error from "../components/Error";
import Success from "../components/Success";
import { useTimedMessage } from "../hooks/useTimedMessage";
import { motion } from "motion/react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useTimedMessage("", 5000);
  const [success, setSuccess] = useTimedMessage("", 5000);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signup, isLoading } = useAuth();

  const onSubmit = async (data) => {
    try {
      // Here you would typically send the data to your backend API
      console.log("Form submitted:", data);
      const res = await signup(data);
      setSuccess(res.message);
      console.log(res);
      // Reset form or redirect after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center bg-bgcolor">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-16">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-textcolor md:text-3xl">
                Join NipeRamani
              </h3>
              <p className="mt-2 text-textsecondary">
                Connect with Tanzania's construction network
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {success && <Success message={success} />}
              {error && <Error error={error} />}
              {[
                {
                  id: "name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "Enter your Full Name",
                },
                {
                  id: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "Enter your Email",
                },
                {
                  id: "phone",
                  label: "Phone",
                  type: "tel",
                  placeholder: "Enter your Phone",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-1 block text-sm font-medium text-textcolor"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.id, {
                      required: `${field.label} is required`,
                      ...(field.id === "email" && {
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      }),
                      ...(field.type === "tel" && {
                        pattern: {
                          value: /^(0|\+255)[0-9]{9}$/,
                          message:
                            "Must start with 0 or +255 followed by 9 digits",
                        },
                        validate: (value) => {
                          const cleanValue = value.replace(/\s/g, "");
                          return (
                            /^(0|\+255)[0-9]{9}$/.test(cleanValue) ||
                            "Invalid phone number format"
                          );
                        },
                      }),
                      ...(field.id === "name" && {
                        minLength: {
                          value: 3,
                          message: "Full Name must be at least 3 characters",
                        },
                      }),
                    })}
                    className="w-full rounded border border-textcolor bg-bgcolor px-3 py-2.5 text-sm text-textcolor outline-none transition-all placeholder:text-textsecondary placeholder:opacity-50 focus:border-textsecondary focus:ring-1 focus:ring-textsecondary"
                  />
                  {errors[field.id] && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors[field.id].message}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-textcolor"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className="w-full rounded border border-textcolor bg-bgcolor px-3 py-2.5 pr-9 text-sm text-textcolor outline-none transition-all placeholder:text-textsecondary placeholder:opacity-50 focus:border-textsecondary focus:ring-1 focus:ring-textsecondary"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform text-textcolor transition-colors hover:text-neutral"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm font-medium text-textcolor"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="w-full rounded border border-textcolor bg-bgcolor px-3 py-2.5 pr-9 text-sm text-textcolor outline-none transition-all placeholder:text-textsecondary placeholder:opacity-50 focus:border-textsecondary focus:ring-1 focus:ring-textsecondary"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform text-textcolor transition-colors hover:text-neutral"
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

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9, y: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                type="submit"
                className="hover:bg-primary-dark mt-4 w-full rounded bg-textsecondary px-4 py-2.5 text-sm font-medium text-bgcolor"
              >
                {isLoading ? (
                  <ActivityIndicator size="xs" className="border-bgcolor" />
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-textsecondary">
              Already registered?{" "}
              <Link to="/login" className="text-textcolor hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <div className="hidden w-full max-w-md lg:block">
            <img
              src="images/register.svg"
              alt="Construction network illustration"
              className="w-full"
            />
            <div className="mt-6 space-y-2 text-center">
              <h4 className="text-lg font-medium text-textcolor">
                Your Gateway to Construction Opportunities
              </h4>
              <p className="text-sm text-textsecondary">
                Connect with suppliers and grow your business
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
