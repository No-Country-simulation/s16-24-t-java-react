import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/login-context";

const useGetCustomers = (refresh) => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const { isLogged } = useContext(LoginContext);

  useEffect(() => {
    const GetAllCustomers = async () => {
      try {
        const { data } = await axios.get("/api/v1/customers/findAll", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`
          }
        });

        console.log("customers", data);
        // setCustomers(data);
      } catch (error) {
        setError(error);
        setCustomers([]);
      }
    }

    GetAllCustomers()
  }, [isLogged, refresh]);

  return { customers, error }
}

export default useGetCustomers