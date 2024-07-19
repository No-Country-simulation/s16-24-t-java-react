import { useEffect, useContext } from "react";
import { LoginContext } from "./contexts/login-context.jsx";

import Home from "../src/components/home/home.jsx"; 
import Login from "./components/login/login.jsx";

import axios from "axios";



axios.defaults.baseURL = "https://sportify-xric.onrender.com";

function App() {
	const { isLogin, setIsLogin } = useContext(LoginContext);

	useEffect(() => {
		// Verificar si hay una sesión almacenada en localStorage al cargar la aplicación
		const loggedInStatus = localStorage.getItem("sportify_jwt_access");
		if (loggedInStatus) {
			setIsLogin(true);
		}
	}, []);

	return (
		<div className="App min-h-dvh flex flex-col max-h-dvh">
			{isLogin ? (
				<Home />
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
