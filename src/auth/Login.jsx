import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthenticationContext } from "../contexts/AuthContext";
import Error from "../components/Error";
import ActivityIndicator from "../components/ActivityIndicator";
import { useTimedMessage } from "../hooks/useTimedMessage";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useTimedMessage("", 5000);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { login, isLoading } = useContext(AuthenticationContext);

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center bg-bgcolor">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-24">
          {/* Login Form - Compact and Centered */}
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-textcolor md:text-3xl">
                Welcome back to{" "}
                <span className="text-textsecondary">Ramani</span>
              </h2>
              <p className="mt-2 text-sm text-textsecondary">
                Connect with Tanzania's construction network
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {error && <Error error={error} />}
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-textcolor"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="text"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="your@email.com"
                  className="w-full rounded border border-textcolor bg-bgcolor px-3 py-2.5 text-sm text-textcolor outline-none transition-all placeholder:text-textsecondary placeholder:opacity-50 focus:border-neutral focus:ring-1 focus:ring-neutral"
                />
                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-textcolor"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-textsecondary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password cannot exceed 20 characters",
                      },
                    })}
                    placeholder="Enter your password"
                    className="w-full rounded border border-textcolor bg-bgcolor px-3 py-2.5 pr-9 text-sm text-textcolor outline-none transition-all placeholder:text-textsecondary placeholder:opacity-50 focus:border-neutral focus:ring-1 focus:ring-neutral"
                  />
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password.message}
                    </span>
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

              <button
                type="submit"
                disabled={isLoading}
                className="hover:bg-primary-dark mt-4 w-full rounded bg-textsecondary px-4 py-2.5 text-sm font-medium text-bgcolor shadow-sm transition-colors"
              >
                {isLoading ? (
                  <ActivityIndicator size="xs" className="border-bgcolor" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-textsecondary"></div>
              <span className="px-3 text-xs text-textcolor">OR</span>
              <div className="flex-1 border-t border-accent/20"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded border border-textsecondary px-4 py-2 text-sm font-medium text-textcolor transition-colors hover:border-neutral"
              >
                <FaGoogle className="h-5 w-5" />
                Continue with Google
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-textsecondary">
              Don't have an account?
              <Link
                to="/register"
                className="font-medium text-textcolor hover:underline"
              >
                {" "}
                Sign up
              </Link>
            </p>
          </div>

          {/* Illustration Section */}
          <div className="hidden w-full max-w-md lg:block">
            <img
              src="images/login.svg"
              alt="Construction professional at work"
              className="w-full"
            />
            <div className="mt-6 space-y-2 text-center">
              <h4 className="text-lg font-medium text-textcolor">
                Streamline Your Construction Workflow
              </h4>
              <p className="text-sm text-textsecondary">
                Access suppliers, projects, and professionals in one place
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
