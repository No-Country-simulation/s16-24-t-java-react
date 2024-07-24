import axios from "axios";

export const useGetComplex = async () => {
  try { 
    const { data } = await axios.get("/api/v1/complexes/findAll", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`
      }
    });
  
    return data
    
  } catch (error) {
    console.log(error);
    return []
  }
 
  // return data
}