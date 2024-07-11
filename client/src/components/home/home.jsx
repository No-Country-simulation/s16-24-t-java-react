import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import Login from "../Login/login.jsx";

function Home() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-1 bg-gray-200">
				<Sidebar />
				<main className="flex-1 p-0">
					<Login />
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
