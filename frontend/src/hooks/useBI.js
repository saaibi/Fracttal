import { useContext } from "react";
import { BIContext } from "../contexto/BIContext";

export const useBI = () => {
  const context = useContext(BIContext);
  if (context === undefined) {
    throw new Error('useBI must be used within a BIContext');
  }
  return context;
};