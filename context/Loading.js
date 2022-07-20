import { createContext, useContext } from "react";
import { useState } from "react";

const LoadingContext = createContext();

export function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState();
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  return useContext(LoadingContext);
}
