import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/login-context";

const Activities = [
	{
		activity_name: "Futbol",
		start_time: "10:00",
		end_time: "12:00",
		code: "1234",
		day_of_week: 3,
		color: "#CCF5D1",
	},
	{
		activity_name: "Basket",
		start_time: "14:00",
		end_time: "15:00",
		code: "2413",
		day_of_week: 2,
		color: "#CCF5D1",
	},
	{
		activity_name: "Volleyball",
		start_time: "16:00",
		end_time: "18:00",
		code: "1234",
		day_of_week: 5,
		color: "#CCF5D1",
	},
];

const useGetActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const { isLogged } = useContext(LoginContext);

  useEffect(() => {
    const GetAllComplexes = async () => {
      try {
        // const { data } = await axios.get("/api/v1/complexes/findAll", {
        //   headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`
        //   }
        // });

        // console.log("Activities", data);
        setActivities(Activities);
      } catch (error) {
        setError(error);
        setActivities([]);
      }
    }

    GetAllComplexes()
  }, [isLogged]);

  return { activities, error }
}

export default useGetActivities