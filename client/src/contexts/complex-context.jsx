import { createContext} from "react";
import  useGetComplex  from "../hooks/useGetComplex";

export const ComplexContext = createContext(null);

export const ComplexProvider = ({ children }) => {
 
  const { complexes, error, handleRefresh, rawComplexes } = useGetComplex();
  
  return (
    <ComplexContext.Provider value={{ complexes, handleRefresh, error, rawComplexes }}>
      {children}
    </ComplexContext.Provider>
  );

}