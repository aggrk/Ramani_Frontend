// hooks/useTimedMessage.js
import { useState, useEffect } from "react";

export const useTimedMessage = (initialValue = "", timeout = 5000) => {
  const [message, setMessage] = useState(initialValue);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [message, timeout]);

  return [message, setMessage];
};
