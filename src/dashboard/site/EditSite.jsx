import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import toast from "react-hot-toast";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function EditSite() {
  const { id } = useParams();
  const { data } = useFetch("site", `/sites/${id}`);
  const selectedSite = data?.data?.site;
  const { handleSubmit, register } = useForm();
  const skills = selectedSite?.skillsRequired?.join(", ");
  const startDate = selectedSite?.dates?.start
    ? new Date(selectedSite.dates.start).toISOString().split("T")[0]
    : "";
  const endDate = selectedSite?.dates?.end
    ? new Date(selectedSite.dates.end).toISOString().split("T")[0]
    : "";
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      await api.patch(`/sites/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Site edited succesfully");
      queryClient.invalidateQueries(["sites"]);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to add site.");
    },
  });

  const onSubmit = (data) => {
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
        type: "Point",
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
    mutation.mutate(siteData);
  };

  if (!selectedSite) return <h1>Loading...</h1>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Edit Site
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Fill in the details to edit this site
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
                  defaultValue={selectedSite.engineerName}
                  {...register("name", {
                    required: "Engineer Name is required!",
                  })}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-[gray-300] px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                  defaultValue={selectedSite.siteTitle}
                  {...register("siteTitle", {
                    required: "Site Title is required!",
                  })}
                  placeholder="Enter site title"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                  defaultValue={selectedSite.siteAddress.region}
                  {...register("region", { required: "Region is required!" })}
                  placeholder="Region/State"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                  defaultValue={selectedSite.siteAddress.city}
                  {...register("city", { required: "City is required!" })}
                  placeholder="City"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                  defaultValue={selectedSite.siteAddress.street}
                  {...register("street", {
                    required: "Street Address is required",
                  })}
                  placeholder="Full street address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                      defaultValue={selectedSite.coordinates.coordinates[0]}
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
                      defaultValue={selectedSite.coordinates.coordinates[1]}
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
                  defaultValue={selectedSite.requiredHandymen}
                  {...register("handymenAmount", {
                    required: "Handymen amount is required!",
                  })}
                  placeholder="Number of workers"
                  min="1"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                  defaultValue={skills}
                  {...register("skills", {
                    required: "Skills set is required!",
                  })}
                  placeholder="e.g., Carpentry, Plumbing, Electrical"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                  defaultValue={startDate}
                  {...register("startDate", {
                    required: "Start Date is required!",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                  defaultValue={endDate}
                  {...register("endDate", {
                    required: "End Date is required!",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
              </div>
              <div>
                <label
                  htmlFor="payment"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Daily Payment (TZS) *
                </label>
                <input
                  type="number"
                  id="payment"
                  defaultValue={selectedSite.paymentPerDay}
                  {...register("payment", {
                    required: "Payment is required!",
                  })}
                  placeholder="Amount per day"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
                />
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
                defaultValue={selectedSite.description}
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                placeholder="Describe the project, responsibilities, requirements, and any other important details..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#B22222]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end border-t border-gray-200 pt-6">
            <button
              type="submit"
              className="transform rounded-lg bg-[#B22222] px-8 py-3 font-semibold text-white outline-none transition-all duration-200 hover:scale-105 hover:bg-[#9B1C1C] focus:scale-105 focus:ring-2 focus:ring-[#B22222] focus:ring-offset-2"
            >
              {mutation.isPending ? (
                <ActivityIndicator size="xs" className="border-white" />
              ) : (
                "Edit Site"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
