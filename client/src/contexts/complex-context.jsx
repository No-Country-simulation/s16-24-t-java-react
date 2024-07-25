import { createContext} from "react";
import  useGetComplex  from "../hooks/useGetComplex";

export const ComplexContext = createContext(null);

export const ComplexProvider = ({ children }) => {
 
  const { complexes, error, handleRefresh } = useGetComplex();
  console.log("contextcomplex",complexes);
  
  return (
    <ComplexContext.Provider value={{ complexes, handleRefresh, error }}>
      {children}
    </ComplexContext.Provider>
  );

}