import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

function Home() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-1 bg-gray-200">
				<Sidebar />
				<main className="flex-1 p-10">
					{/* Contenido principal de la página */}
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
