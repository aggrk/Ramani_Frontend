import { createContext } from "react";

const CurrentUserContext = createContext();

export default function CurrentUserProvider({ children }) {
  return (
    <CurrentUserContext.Provider value={{}}>
      {children}
    </CurrentUserContext.Provider>
  );
}
