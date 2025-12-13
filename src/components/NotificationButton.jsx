import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationButton() {
  const [notifications] = useState(3);

  return (
    <button
      className="text-textcolor relative p-2 transition-colors hover:-translate-y-1 hover:translate-x-1 hover:transform"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
      {notifications > 0 && (
        <span className="bg-textcolor text-bgcolor absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full text-xs">
          {notifications}
        </span>
      )}
    </button>
  );
}
