import React, { useState } from "react";
import Header from "../src/components/header/header.jsx";
import Sidebar from "../src/components/sidebar/sidebar.jsx";
import Footer from "../src/components/footer/footer.jsx";
import Login from "../src/components/Login/login.jsx";
import Table from "../src/components/table/table.jsx";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
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
