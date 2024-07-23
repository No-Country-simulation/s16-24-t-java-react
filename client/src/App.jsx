import { useEffect, useContext} from "react";
import { LoginContext } from "./contexts/login-context.jsx";
import Home from "../src/components/home/home.jsx";
import Login from "./components/login/login.jsx";
import LoginSpinner from "./components/login/login-spinner.jsx";
import axios from "axios";

axios.defaults.baseURL = "https://sportify-xric.onrender.com";

function App() {
	const { isLogged, handleIsLogged, isLogin } = useContext(LoginContext);
	

	useEffect(() => {
		const loggedInStatus = localStorage.getItem("sportify_jwt_access");
		if (loggedInStatus) {
			handleIsLogged(loggedInStatus);
		}
	}, []);


	return (
		<div className="App min-h-dvh flex flex-col relative">
			{!isLogin && !isLogged && <Login />}
			{isLogin && !isLogged && <LoginSpinner />}
			{isLogged && <Home />}
		</div>
	);
}

export default App;
