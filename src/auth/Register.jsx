import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import Error from "../components/Error";
import Success from "../components/Success";
import { useTimedMessage } from "../hooks/useTimedMessage";

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
    <div className="min-h-screen bg-neutral/5 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Compact Registration Form */}
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-textdark">
                Join Ramani
              </h3>
              <p className="text-textlight mt-2">
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
                    className="block text-sm font-medium text-textdark mb-1"
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
                    className="w-full px-3 py-2.5 text-sm outline-none bg-white border border-accent/20 rounded focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                  {errors[field.id] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.id].message}
                    </p>
                  )}
                </div>
              ))}

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-textdark mb-1"
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
                    className="w-full px-3 py-2.5 outline-none text-sm bg-white border border-accent/20 rounded focus:ring-1 focus:ring-primary focus:border-primary transition-all pr-9"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-textlight hover:text-primary transition-colors"
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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-textdark mb-1"
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
                    className="w-full px-3 py-2.5 text-sm outline-none bg-white border border-accent/20 rounded focus:ring-1 focus:ring-primary focus:border-primary transition-all pr-9"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-textlight hover:text-primary transition-colors"
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

              <button
                type="submit"
                className="w-full mt-4 py-2.5 px-4 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
              >
                {isLoading ? <ActivityIndicator size="xs" /> : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-textlight mt-6">
              Already registered?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Illustration Section */}
          <div className="hidden lg:block w-full max-w-md">
            <img
              src="images/register.svg"
              alt="Construction network illustration"
              className="w-full"
            />
            <div className="text-center mt-6 space-y-2">
              <h4 className="text-lg font-medium text-textdark">
                Your Gateway to Construction Opportunities
              </h4>
              <p className="text-sm text-textlight">
                Connect with suppliers and grow your business
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
