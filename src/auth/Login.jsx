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
    <div className="min-h-screen bg-neutral/5 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* Login Form - Compact and Centered */}
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-textdark">
                Welcome back to <span className="text-primary">Ramani</span>
              </h2>
              <p className="text-textlight mt-2 text-sm">
                Connect with Tanzania's construction network
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {error && <Error error={error} />}
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-textdark mb-1"
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
                  className="w-full px-3 py-2.5 outline-none text-sm bg-white border border-accent/20 rounded focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-textdark"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
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
                    className="w-full px-3 py-2.5 text-sm outline-none bg-white border border-accent/20 rounded focus:ring-1 focus:ring-primary focus:border-primary transition-all pr-9"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {errors.password.message}
                    </span>
                  )}
                  <button
                    type="button"
                    className="absolute  right-2 top-1/2 transform -translate-y-1/2 text-textlight hover:text-primary transition-colors"
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
                className="w-full mt-4 py-2.5 px-4 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors shadow-sm"
              >
                {isLoading ? (
                  <ActivityIndicator size="xs" className="border-white" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-accent/20"></div>
              <span className="px-3 text-xs text-textlight">OR</span>
              <div className="flex-1 border-t border-accent/20"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-accent/20 rounded text-sm font-medium text-textdark hover:border-primary/50 transition-colors"
              >
                <FaGoogle className="h-5 w-5" />
                Continue with Google
              </button>
            </div>

            <p className="text-center text-sm text-textlight mt-6">
              Don't have an account?
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                {" "}
                Sign up
              </Link>
            </p>
          </div>

          {/* Illustration Section */}
          <div className="hidden lg:block w-full max-w-md">
            <img
              src="images/login.svg"
              alt="Construction professional at work"
              className="w-full"
            />
            <div className="text-center mt-6 space-y-2">
              <h4 className="text-lg font-medium text-textdark">
                Streamline Your Construction Workflow
              </h4>
              <p className="text-sm text-textlight">
                Access suppliers, projects, and professionals in one place
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
