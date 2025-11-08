import { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import api from "../../utils/api";
import toast from "react-hot-toast";

const imgUrl = import.meta.env.VITE_IMG_URL;

export default function Profile() {
  const [updatePassword, setUpdatePassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { user, setUser } = useAuth();
  const { name, email, phone, photo, status, createdAt } = user?.data;
  const memberSince = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "2-digit",
  });

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // show preview
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      setIsUploading(true);
      const res = await api.patch(`users/updateMe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res.data);
      if (res.data.status && res.status)
        toast.success("Profile photo Updated succesfully");
      setUser(res.data);
    } catch (err) {
      // console.error(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
          <h1 className="text-2xl font-bold text-[#1A1A1A] sm:text-3xl lg:text-4xl">
            Profile Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Left Column - Profile Card */}
          <div className="h-fit rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6 lg:sticky lg:top-8">
            <div className="mb-4 flex flex-col items-center sm:mb-6">
              <div
                className="group relative mb-3 flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#F3E9D9] sm:mb-4 sm:h-36 sm:w-36 md:h-40 md:w-40"
                onClick={() => fileInputRef.current.click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : photo ? (
                  <img
                    src={`${imgUrl}/users/${photo}`}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <svg
                      className="h-16 w-16 text-[#556B2F] sm:h-20 sm:w-20 md:h-24 md:w-24"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {isUploading ? (
                    <span className="text-sm text-white">Uploading...</span>
                  ) : (
                    <svg
                      className="h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </div>
              <h2 className="text-center text-lg font-bold text-[#1A1A1A] sm:text-xl lg:text-2xl">
                {name}
              </h2>
              <p className="text-center text-sm font-medium text-[#556B2F] sm:text-base lg:text-lg">
                {email}
              </p>
              <button
                onClick={() => fileInputRef.current.click()} // ✅ opens file selector
                className="mt-2 text-sm font-medium text-[#B22222] transition-colors duration-200 hover:text-[#9B1C1C] sm:mt-3 sm:text-base lg:text-lg"
              >
                {isUploading ? "Uploading..." : "Change Photo"}
              </button>
            </div>
            <div className="border-t border-[#E8D9C5] pt-3 sm:pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-[#666] sm:text-sm lg:text-base">
                  Account status:
                </span>
                <span className="text-xs font-medium text-[#556B2F] sm:text-sm lg:text-base">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#666] sm:text-sm lg:text-base">
                  Member since:
                </span>
                <span className="text-xs font-medium text-[#333] sm:text-sm lg:text-base">
                  {memberSince}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-3">
            {/* Profile Update Form */}
            <div className="rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6">
              <div className="mb-4 flex items-center justify-between sm:mb-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] sm:text-xl lg:text-2xl">
                  Personal Information
                </h2>
                <div className="h-1 w-8 rounded-full bg-[#B22222] sm:w-10 md:w-12"></div>
              </div>
              <Link
                to="update/name"
                className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-neutral px-4 py-2"
              >
                <h3 htmlFor="name" className="">
                  Full Name
                </h3>
                <p className="text- text-light text-sm opacity-50">{name}</p>
              </Link>
              <Link
                to="update/email"
                className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-neutral px-4 py-2"
              >
                <label htmlFor="email" className="">
                  Email Address
                </label>
                <p className="text- text-light text-sm opacity-50">{email}</p>
              </Link>
              <Link
                to="update/phone"
                className="shadow- mb-4 flex flex-col gap-1 rounded-md bg-neutral px-4 py-2"
              >
                <label htmlFor="phone" className="">
                  Phone Number
                </label>
                <p className="text- text-light text-sm opacity-50">{phone}</p>
              </Link>
            </div>

            {/* Password Update Section */}
            <div className="rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6">
              <div className="mb-4 flex items-center justify-between sm:mb-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] sm:text-xl lg:text-2xl">
                  Password & Security
                </h2>
                <div className="h-1 w-8 rounded-full bg-[#556B2F] sm:w-10 md:w-12"></div>
              </div>
              {updatePassword ? (
                <UpdatePassword setUpdatePassword={setUpdatePassword} />
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  <p className="text-sm text-[#555] sm:text-base lg:text-lg">
                    For security reasons, we recommend changing your password
                    regularly. Ensure it's strong and unique to protect your
                    account.
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setUpdatePassword(true)}
                      className="rounded-lg border border-[#B22222] bg-transparent px-4 py-2 text-sm font-medium text-[#B22222] shadow-sm transition-all duration-300 hover:bg-[#FFF0F0] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:ring-opacity-50 sm:px-6 sm:py-3 sm:text-base lg:text-lg"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
