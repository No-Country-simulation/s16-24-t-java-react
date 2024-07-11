import React from "react";
import logo from "../.././../src/assets/OIG21.jpeg";

function Header({ backgroundColor }) {
	return (
		<header className={`py-4 shadow-md ${backgroundColor}`}>
			<div className="container mx-auto px-4 flex items-center justify-center">
				{/* Logo y nombre */}
				<div className="flex items-center">
					<img src={logo} alt="Logo de la empresa" className="h-20 mr-2" />
				</div>
				<div>
					<h1 className="text-xl font-bold">Sportify</h1>
				</div>
			</div>
		</header>
	);
}

export default Header;
