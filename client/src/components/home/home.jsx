import { useState } from "react";
import Header from "../header/header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Footer from "../footer/footer.jsx";
import Login from "../login/login.jsx";
import Table from "../table/table.jsx";

function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// TODO: Despues ver bien como hacer el manejo de rutas protegidas react router
	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<div className="flex flex-col h-screen">
			{isLoggedIn ? (
				<>
					<Header backgroundColor="bg-white" />
					<div className="flex flex-1 bg-gray-200">
						<Sidebar />
						<main className="flex-1 p-0">
							<Table/>
						</main>
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
