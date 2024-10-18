import { useContext } from "react";
import { Context } from "../../context/Context";

// Format numbers with commas (e.g., 2,300,454)
export const formatNumberWithCommas = (num: number): string => {
  const validNumber = isNaN(num) || num === null || num === undefined ? 0 : num; // Fallback to 0 if num is invalid
  return validNumber.toLocaleString();
};

// Format date in "YYYY-MM-DD" format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Pad month with leading zero
  const day = date.getDate().toString().padStart(2, "0"); // Pad day with leading zero

  return `${year}-${month}-${day}`;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
