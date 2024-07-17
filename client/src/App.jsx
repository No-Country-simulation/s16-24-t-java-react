import { useState, useEffect } from "react";
import Login from "./components/login/login.jsx";
import Home from "./components/home/home.jsx";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Verificar si hay una sesión almacenada en localStorage al cargar la aplicación
		const loggedInStatus = localStorage.getItem("loggedIn");
		if (loggedInStatus === "true") {
			setIsLoggedIn(true);
		}
	}, []); // Solo se ejecuta una vez al montar el componente

	const handleLogin = () => {
		setIsLoggedIn(true);
		// Guardar estado de sesión en localStorage
		localStorage.setItem("loggedIn", "true");
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		// Limpiar estado de sesión en localStorage
		localStorage.removeItem("loggedIn");
	};

	return (
		<div className="App min-h-dvh flex flex-col max-h-dvh">
			{isLoggedIn ?
				(
					<Home handleLogOut={handleLogout} />
				) :
				(
					<Login onLogin={handleLogin} />
				)}
		</div>
	);
}

export default App;
