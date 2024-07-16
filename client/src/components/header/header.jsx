function Header() {
	return (
		<header className="py-4 shadow-md bg-white">
			<div className="container mx-auto px-60 flex items-center justify-between">
				{/* Logo y nombre */}
				<div className="flex items-center">
					<img
						src="src/assets/OIG21.jpeg"
						alt="Logo de la empresa"
						className="h-20 mr-2"
					/>
					<h1 className="text-xl font-bold">Sportify</h1>
				</div>
			</div>
		</header>
	);
}

export default Header;
