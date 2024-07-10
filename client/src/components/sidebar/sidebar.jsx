import React from "react";

function SideBar() {
	return (
		<div className="bg-gray-800 text-white h-screen w-64 py-6 px-4">
			<h2 className="text-lg font-bold mb-8">Menu</h2>
			<ul>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Inicio
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Perfil
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Ajustes
					</a>
				</li>
				{/* Agrega más elementos de menú según sea necesario */}
			</ul>
		</div>
	);
}

export default SideBar;
