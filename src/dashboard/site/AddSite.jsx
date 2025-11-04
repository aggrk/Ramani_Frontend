import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AddSite() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const siteData = {
        engineerName: data.name,
        siteTitle: data.siteTitle,
        siteAddress: {
          street: data.street,
          city: data.city,
          region: data.region,
          country: "Tanzania",
        },
        coordinates: {
          coordinates: [data.longitude, data.latitude],
        },
        requiredHandymen: data.handymenAmount,
        skillsRequired: [data.skills],
        dates: {
          start: data.startDate,
          end: data.endDate,
        },
        paymentPerDay: data.payment,
        description: data.description,
      };
      const res = await api.post("/sites", siteData);
    },
    onSuccess: () => {
      toast.success("Site Added Succesfully!");
      queryClient.invalidateQueries(["sites"]);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to add site.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Add A New Site
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Fill in the details to create your job site posting
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl bg-white shadow-xl ring-1 ring-gray-200/50"
      >
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          {/* Personal Information Section */}
          <div className="mb-10">
            <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-900">
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-[#B22222]"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Engineer Name is required!",
                  })}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-[gray-300] px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="siteTitle"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Site Title *
                </label>
                <input
                  type="text"
                  id="siteTitle"
                  {...register("siteTitle", {
                    required: "Site Title is required!",
                  })}
                  placeholder="Enter site title"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
                {errors.siteTitle && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.siteTitle.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-10">
            <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-900">
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-[#B22222]"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Region *
                </label>
                <input
                  type="text"
                  id="region"
                  {...register("region", { required: "Region is required!" })}
                  placeholder="Region/State"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", { required: "City is required!" })}
                  placeholder="City"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
                {errors.street && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.street.message}
                  </p>
                )}
              </div>

              {/* Coordinates Field */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Coordinates
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="longitude"
                      className="mb-1 block text-xs text-gray-500"
                    >
                      Longitude
                    </label>
                    <input
                      type="text"
                      id="longitude"
                      {...register("longitude")}
                      placeholder="-6.7924"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="latitude"
                      className="mb-1 block text-xs text-gray-500"
                    >
                      Latitude
                    </label>
                    <input
                      type="text"
                      id="latitude"
                      {...register("latitude")}
                      placeholder="39.2083"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Coordinates will be generated automatically based on the
                  location or can be entered manually
                </p>
              </div>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="mb-10">
            <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-900">
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-[#B22222]"
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
                Job Details
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="handymenAmount"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Handymen Needed *
                </label>
                <input
                  type="number"
                  id="handymenAmount"
                  {...register("handymenAmount", {
                    required: "Handymen amount is required!",
                  })}
                  placeholder="Number of workers"
                  min="1"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
                {errors.handymenAmount && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.handymenAmount.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="skills"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Skills Required *
                </label>
                <input
                  type="text"
                  id="skills"
                  {...register("skills", {
                    required: "Skills set is required!",
                  })}
                  placeholder="e.g., Carpentry, Plumbing, Electrical"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
                {errors.skills && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  {...register("startDate", {
                    required: "Start Date is required!",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
                {errors.startDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  {...register("endDate", {
                    required: "End Date is required!",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
                {errors.endDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="payment"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Daily Payment ($) *
                </label>
                <input
                  type="number"
                  id="payment"
                  {...register("payment", {
                    required: "Payment is required!",
                  })}
                  placeholder="Amount per day"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
                {errors.payment && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.payment.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-900">
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-[#B22222]"
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
                Job Description
              </span>
            </h2>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Project Description *
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                placeholder="Describe the project, responsibilities, requirements, and any other important details..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end border-t border-gray-200 pt-6">
            <button
              type="submit"
              className="transform rounded-lg bg-[#B22222] px-8 py-3 font-semibold text-white outline-none transition-all duration-200 hover:scale-105 hover:bg-[#9B1C1C] focus:scale-105 focus:ring-2 focus:ring-[#B22222] focus:ring-offset-2"
            >
              Post Site
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
