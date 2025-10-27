import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

export default function AuthContextProvider({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getInitialUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${apiUrl}/users/me`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.message);
      setUser(null);
    } finally {
      setIsLoading(false);
      setAuthChecked(true);
    }
  };

  const login = async (userData) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${apiUrl}/users/login`, userData, {
        withCredentials: true,
      });
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;

      const userResponse = await axios.get(`${apiUrl}/users/me`, {
        withCredentials: true,
      });
      setUser(userResponse.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Login failed");
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${apiUrl}/users/signup`, userData, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err.response?.data?.message || "Register failed");
      throw new Error(err.response?.data?.message || "Register failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await axios.get(`${apiUrl}/users/logout`, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.log(
        err.response?.data?.message || "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInitialUser();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ login, logout, authChecked, user, setUser, isLoading, signup }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
