import React, { useState } from "react";
import Header from "../header/header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Footer from "../footer/footer.jsx";
import Login from "../Login/login.jsx";

function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true); // Establecer isLoggedIn a true cuando el inicio de sesión es exitoso
	};

	return (
		<div className="flex flex-col h-screen">
			{isLoggedIn ? (
				<>
					<Header />
					<div className="flex flex-1 bg-gray-200">
						<Sidebar />
						<main className="flex-1 p-0"></main>
					</div>
					<Footer />
				</>
			) : (
				<Login onLogin={handleLogin} />
			)}
		</div>
	);
}

export default Home;
