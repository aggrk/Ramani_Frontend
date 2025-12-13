import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import api from "../utils/api";
import { imageUrl } from "../utils/utils";

export default function ProfileCard() {
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
      setPreview(URL.createObjectURL(file));
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
    <div className="h-fit rounded-xl bg-textcolor p-4 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6 lg:sticky lg:top-8">
      <div className="mb-4 flex flex-col items-center sm:mb-6">
        <div
          className="group relative mb-3 flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-bgfooter sm:mb-4 sm:h-36 sm:w-36 md:h-40 md:w-40"
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
              src={`${imageUrl}/users/${photo}`}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <svg
                className="h-16 w-16 text-textcolor sm:h-20 sm:w-20 md:h-24 md:w-24"
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
          <div className="absolute inset-0 flex items-center justify-center bg-bgfooter bg-opacity-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {isUploading ? (
              <span className="text-sm text-textcolor">Uploading...</span>
            ) : (
              <svg
                className="h-8 w-8 text-textcolor sm:h-10 sm:w-10 md:h-12 md:w-12"
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

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageSelect}
          />
        </div>
        <h2 className="text-center text-lg font-bold text-bgfooter sm:text-xl lg:text-2xl">
          {name}
        </h2>
        <p className="text-textalt text-center text-sm font-medium sm:text-base lg:text-lg">
          {email}
        </p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80 sm:mt-3 sm:text-base lg:text-lg"
        >
          {isUploading ? "Uploading..." : "Change Photo"}
        </button>
      </div>
      <div className="border-t border-bgfooter/20 pt-3 sm:pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-bgfooter sm:text-sm lg:text-base">
            Account status:
          </span>
          <span className="text-textalt text-xs font-medium sm:text-sm lg:text-base">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-bgfooter sm:text-sm lg:text-base">
            Member since:
          </span>
          <span className="text-textalt text-xs font-medium sm:text-sm lg:text-base">
            {memberSince}
          </span>
        </div>
      </div>
    </div>
  );
}
