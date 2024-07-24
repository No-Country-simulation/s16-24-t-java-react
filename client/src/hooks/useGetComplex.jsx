import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/login-context";



const useGetComplexes = () => {
  const [complexes, setComplexes] = useState([]);
  const [error, setError] = useState(null);
  const { isLogged } = useContext(LoginContext);

  useEffect(() => {
    const GetAllComplexes = async () => {
      try {
        const { data } = await axios.get("/api/v1/complexes/findAll", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`
          }
        });
        const { object } = data
        setComplexes(object.content);
      } catch (error) {
        setError(error);
        setComplexes([]);
      }
    }

    GetAllComplexes()
  }, [isLogged]);

  return { complexes, error }
}

export default useGetComplexes