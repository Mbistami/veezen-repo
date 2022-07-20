import { createContext, useContext } from "react";
import { useState } from "react";

export const CalContext = createContext();

export function CalWrapper({ children }) {
  const [date, setDate] = useState(new Date());
  return (
    <CalContext.Provider value={[date, setDate]} setValue={setDate}>
      {children}
    </CalContext.Provider>
  );
}

export function useCalContext() {
  return useContext(CalContext);
}
