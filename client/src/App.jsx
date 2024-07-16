import React, { useState, useEffect } from "react";
import Header from "../src/components/header/header.jsx";
import Sidebar from "../src/components/sidebar/sidebar.jsx";
import Footer from "../src/components/footer/footer.jsx";
import Login from "../src/components/login/login.jsx";
import Table from "../src/components/table/table.jsx";

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
		<>
			<div className="App">
				{isLoggedIn && <Header onLogout={handleLogout} />}
				<div className="flex flex-col h-screen">
					{isLoggedIn ? (
						<div className="flex flex-1 bg-gray-200">
							<Sidebar />
							<main className="flex-1 p-0">
								<Table />
							</main>
						</div>
					) : (
						<Login onLogin={handleLogin} />
					)}
					<Footer />
				</div>
			</div>
		</>
	);
}

export default App;
