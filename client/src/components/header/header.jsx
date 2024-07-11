import React from "react";
import logo from "../.././../src/assets/OIG2.jpeg";

function Header() {
	return (
		<header className="bg-gray-800 text-white shadow-md py-4">
			<div className="container mx-auto px-4 flex items-center justify-between">
				{/* Logo a la izquierda */}
				<div className="flex items-center">
					<img
						src={logo} // Reemplaza con la URL o ruta de tu logo
						alt="Logo de la empresa"
						className="h-20 mr-2" // Clase para ajustar el tamaño del logo
					/>
					<h1 className="text-xl font-bold">Sportify</h1>{" "}
					{/* Nombre en el centro */}
				</div>

				{/* Botón de login a la derecha */}
				<button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded">
					Login
				</button>
			</div>
		</header>
	);
}

export default Header;
