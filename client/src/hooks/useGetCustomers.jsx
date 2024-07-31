import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/login-context";
import { formatCustomerData } from "../lib/helpers";

const useGetCustomers = (refresh) => {
  const [customers, setCustomers] = useState([]);
  const [rawCustomers, setRawCustomers] = useState([]);
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
        setRawCustomers(data.object);
        const formatedCustomers = formatCustomerData(data.object);
        setCustomers(formatedCustomers);
      } catch (error) {
        setError(error);
        setCustomers([]);
      }
    }

    GetAllCustomers()
  }, [isLogged, refresh]);

  return { customers, error, rawCustomers }
}

export default useGetCustomers