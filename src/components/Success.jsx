export default function Success({ message }) {
  return (
    <div
      className={`px-4 py-3 mb-4 text-sm font-medium rounded-lg border ${
        message
          ? "bg-green-50 text-green-700 border-green-200 animate-fade-in"
          : "hidden"
      } w-full max-w-full`}
    >
      <div className="flex items-start">
        <svg
          className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="flex-1">{message}</span>
      </div>
    </div>
  );
}
