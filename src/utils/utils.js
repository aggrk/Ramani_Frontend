// Format date to display in normal format (e.g., "January 15, 2023")
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// export const apiUrl = import.meta.env.VITE_API_URL;
export const apiUrl = "https://ramaniapi.deploy.tz/api/v1";
export const imageUrl = import.meta.env.VITE_IMG_URL;
