export default function ActivityIndicator({ size = "md", className = "" }) {
  // Define size variants
  const sizeVariants = {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  // Get the selected size class or default to medium
  const sizeClass = sizeVariants[size] || sizeVariants.md;

  return (
    <div className="flex justify-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClass} ${className}`}
      ></div>
    </div>
  );
}
