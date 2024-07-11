import React from "react";
import logo from "../.././../src/assets/OIG21.jpeg";

function Header() {
	return (
		<header className="bg-gray-800 text-white shadow-md py-4">
			<div className="container mx-auto px-4 flex items-center justify-between">
				{/* Logo a la izquierda */}
				<div className="flex items-center">
					<img src={logo} alt="Logo de la empresa" className="h-10 mr-2" />
					<h1 className="text-xl font-bold">Sportify</h1>{" "}
					{/* Nombre en el centro */}
				</div>
			</div>
		</header>
	);
}

export default Header;
