import { createContext} from "react";
import  useGetComplex  from "../hooks/useGetComplex";

export const ComplexContext = createContext(null);

export const ComplexProvider = ({ children }) => {
 
  const { complexes } = useGetComplex();
  console.log("contextcomplex",complexes);
  
  return (
    <ComplexContext.Provider value={{ complexes }}>
      {children}
    </ComplexContext.Provider>
  );

}