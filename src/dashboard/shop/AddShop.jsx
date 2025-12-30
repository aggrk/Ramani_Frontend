import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function AddShop() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({});

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-textcolor sm:text-4xl">
          Add A New Shop
        </h1>
        <p className="mt-3 text-lg text-textsecondary">
          Fill in the details to add your new shop.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl bg-bgfooter shadow-xl"
      >
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="mb-10">
            <h2 className="mb-6 border-b border-textcolor/40 pb-2 text-xl font-semibold text-textcolor">
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-textsecondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Personal Information
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-textcolor"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Shop Dealer Name is required!",
                  })}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-textcolor"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required!",
                  })}
                  placeholder="Enter your email"
                  className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-textcolor"
                >
                  Phone Number *
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: "Phone Number is required!",
                  })}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="shopName"
                  className="mb-2 block text-sm font-medium text-textcolor"
                >
                  Hardware Name *
                </label>
                <input
                  type="text"
                  id="shopName"
                  {...register("shopName", {
                    required: "Shop Name is required!",
                  })}
                  placeholder="Enter shop name"
                  className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                />
                {errors.shopName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.shopName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="mb-6 border-b border-textcolor/40 pb-2 text-xl font-semibold text-textcolor">
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-textsecondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Location Details
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="region"
                  className="mb-2 block text-sm font-medium text-textcolor"
                >
                  Region *
                </label>
                <input
                  type="text"
                  id="region"
                  {...register("region", { required: "Region is required!" })}
                  placeholder="Region/State"
                  className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                />
                {errors.region && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.region.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-textcolor"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", { required: "City is required!" })}
                  placeholder="City"
                  className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label
                  htmlFor="street"
                  className="mb-2 block text-sm font-medium text-textcolor"
                >
                  Street Address *
                </label>
                <input
                  type="text"
                  id="street"
                  {...register("street", {
                    required: "Street Address is required",
                  })}
                  placeholder="Full street address"
                  className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                />
                {errors.street && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.street.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-sm font-medium text-textcolor">
                  Coordinates
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="longitude"
                      className="mb-1 block text-xs text-textcolor"
                    >
                      Longitude
                    </label>
                    <input
                      type="text"
                      id="longitude"
                      {...register("longitude")}
                      placeholder="-6.7924"
                      className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="latitude"
                      className="mb-1 block text-xs text-textcolor"
                    >
                      Latitude
                    </label>
                    <input
                      type="text"
                      id="latitude"
                      {...register("latitude")}
                      placeholder="39.2083"
                      className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-textsecondary">
                  Coordinates will be generated automatically based on the
                  location or can be entered manually
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="mb-6 border-b border-textcolor/40 pb-2 text-xl font-semibold text-textcolor">
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-textsecondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Shop Details
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="handymenAmount"
                  className="mb-2 block text-sm font-medium text-textcolor"
                >
                  Licence *
                </label>
                <input
                  type="file"
                  id="licence"
                  accept=".pdf"
                  {...register("licence", {
                    required: "Licence is required!",
                  })}
                  placeholder="Enter your licence"
                  min="1"
                  className="w-full rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
                />
                {errors.licence && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.licence.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-6 border-b border-textcolor/40 pb-2 text-xl font-semibold text-textcolor">
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-textsecondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                Shop Description
              </span>
            </h2>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-textcolor"
              >
                Shop Description *
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                placeholder="Describe your shop"
                className="w-full resize-none rounded-lg bg-textcolor px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 placeholder:text-bgcolor/40 focus:border-transparent focus:ring-2 focus:ring-textsecondary"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end border-t border-textcolor/40 pt-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.9, y: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              type="submit"
              className="transform rounded-lg bg-textfooter px-8 py-3 font-semibold text-bgfooter outline-none"
            >
              {mutation.isPending ? (
                <ActivityIndicator size="xs" className="border-white" />
              ) : (
                "Add Site"
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
