import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  return context;
};
