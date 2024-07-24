import { createContext, useState, useEffect, useContext } from "react";
import { useGetComplex } from "../hooks/useGetComplex";
import { LoginContext } from "./login-context";

export const ComplexContext = createContext(null);

export const ComplexProvider = ({ children }) => {
  const [complexes, setComplexes] = useState([]);
  const {isLogged} = useContext(LoginContext);
  

  

  useEffect(() => {
    if (!isLogged) return;
    const GetAllComplexes = async () => {
      const data = await useGetComplex();
      if (data) setComplexes(data);
    }
    
   GetAllComplexes();

   console.log("complexes",complexes);
  }, [isLogged,]);


  return (
    <ComplexContext.Provider value={{ complexes }}>
      {children}
    </ComplexContext.Provider>
  );

}