import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ActivityIndicator from "../components/ActivityIndicator";

export default function GuestOnly({ children }) {
  const { user, authChecked } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authChecked && user !== null) {
      navigate("/dashboard");
    }
  }, [user, authChecked]);

  if (!authChecked || user)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral/50 backdrop-blur-sm z-50">
        <div className="text-center space-y-4">
          <ActivityIndicator className="text-primary" />
          {/* <p className="text-textdark font-medium">Loading content...</p> */}
        </div>
      </div>
    );

  return <>{children}</>;
}
