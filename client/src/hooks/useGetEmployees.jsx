import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/login-context";
import { formatEmployeeData } from "../lib/helpers";

const useGetEmployees = (refresh) => {
  const [employees, setEmployees] = useState([]);
  const [rawEmployees, setRawEmployees] = useState([]);
  const [error, setError] = useState(null);
  const { isLogged } = useContext(LoginContext);

  useEffect(() => {
    const GetAllEmployees = async () => {
      try {
        const { data } = await axios.get("/api/v1/employees/findAll", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`
          }
        });
        const { content } = data.object
        const [admin, ...rawEmployees] = content
        setRawEmployees(rawEmployees)
        const formatedContent = formatEmployeeData(rawEmployees);
        setEmployees(formatedContent);
      } catch (error) {
        setError(error);
        setEmployees([]);
      }
    }

    GetAllEmployees()
  }, [isLogged, refresh]);

  return { employees, error, rawEmployees }
}

export default useGetEmployees