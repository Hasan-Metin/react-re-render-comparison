import { useContext } from "react";
import { BoxContext } from "../context/BoxContext";

export const useBoxContext = () => {
  const context = useContext(BoxContext);
  if (!context) {
    throw new Error("useBoxContext must be used within a BoxContextProvider");
  }
  return context;
};
