import React from "react";

function SideBar() {
	return (
		<div className="bg-gray-800 text-white h-screen w-64 py-6 px-4">
			<h2 className="text-lg font-bold mb-8">Menu</h2>
			<ul>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Alta Clientes
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Modificar Cliente
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Baja Cliente
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Mi Centro
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Alta Empleado
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Modificar Empleado
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Baja Empleado
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Alta Sucursal
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Clases y Horarios
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Reportes
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Ingreso / Salida de dinero
					</a>
				</li>
				<li className="mb-3">
					<a href="#" className="block text-gray-300 hover:text-white">
						Soporte
					</a>
				</li>
				{/* Agrega más elementos de menú según sea necesario */}
			</ul>
		</div>
	);
}

export default SideBar;
