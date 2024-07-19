import { useOutletContext } from "react-router-dom";

function RutaPrueba() {
  const pathname = useOutletContext();
  return (
    <p>{pathname}</p>
  )
}

export default RutaPrueba