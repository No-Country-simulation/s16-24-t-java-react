import Home from "../src/components/home/home.jsx"; // Importa el componente home
import axios from "axios";

import { useState, useEffect } from "react";

import Login from "./components/login/login.jsx";

axios.defaults.baseURL = "https://sportify-xric.onrender.com";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	useEffect(() => {
		// Verificar si hay una sesión almacenada en localStorage al cargar la aplicación
		const loggedInStatus = localStorage.getItem("sportify_jwt_access");
		if (loggedInStatus) {
			setIsLoggedIn(true);
		}
	}, []); // Solo se ejecuta una vez al montar el componente


	const handleLogout = () => {
		setIsLoggedIn(false);
		// Limpiar estado de sesión en localStorage
		localStorage.removeItem("sportify_jwt_access");
	};

	return (
		<div className="App min-h-dvh flex flex-col max-h-dvh">
			{isLoggedIn ? (
				<Home handleLogOut={handleLogout} />
			) : (
				<Login setIsLoggedIn={setIsLoggedIn} />
			)}
		</div>
	);
}

export default App;
