import React from "react";
import Sidebar from "../sidebar/sidebar.jsx"; // Importar el componente Sidebar

function Home() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 bg-gray-200 p-10"></div>
		</div>
	);
}

export default Home;
