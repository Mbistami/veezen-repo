import { createContext, useContext } from "react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useApi } from "../hooks/useApi";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState();

  React.useEffect(() => {
    if (window !== undefined && window?.localStorage.getItem("vee_user_data")) {
      setUser(JSON.parse(window?.localStorage.getItem("vee_user_data")));
    }
  }, []);
  return (
    <AppContext.Provider value={[user, setUser]} setValue={setUser}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
