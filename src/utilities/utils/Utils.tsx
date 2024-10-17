import { useContext } from "react";
import { Context } from "../../context/Context";

// Format numbers with commas (e.g., 2,300,454)
export const formatNumberWithCommas = (num: number): string => {
  const validNumber = isNaN(num) || num === null || num === undefined ? 0 : num; // Fallback to 0 if num is invalid
  return validNumber.toLocaleString();
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
