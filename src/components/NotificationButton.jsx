import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationButton() {
  const [notifications] = useState(3);

  return (
    <button
      className="relative p-2 text-gray-500 transition-colors hover:text-primary"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
      {notifications > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {notifications}
        </span>
      )}
    </button>
  );
}
