import { createContext} from "react";
import  useGetComplex  from "../hooks/useGetComplex";

export const ComplexContext = createContext(null);

export const ComplexProvider = ({ children }) => {
 
  const { complexes, error, handleRefresh } = useGetComplex();
  
  return (
    <ComplexContext.Provider value={{ complexes, handleRefresh, error }}>
      {children}
    </ComplexContext.Provider>
  );

}