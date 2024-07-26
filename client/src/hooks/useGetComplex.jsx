import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/login-context";
import { formatComplexData } from "../lib/helpers";



const useGetComplexes = () => {
  const [complexes, setComplexes] = useState([]);
  const [rawComplexes, setRawComplexes] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { isLogged } = useContext(LoginContext);

  useEffect(() => {
    const GetAllComplexes = async () => {
      try {
        const { data } = await axios.get("/api/v1/complexes/findAll", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`
          }
        });
        const { content } = data.object
        setRawComplexes(content);
        const formatedContent = formatComplexData(content);
        setComplexes(formatedContent);
      } catch (error) {
        setError(error);
        setComplexes([]);
      }
    }

    GetAllComplexes()
  }, [isLogged, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  }

  return { complexes, error, handleRefresh, rawComplexes }
}

export default useGetComplexes