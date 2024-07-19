import Sidebar from "../sidebar/sidebar.jsx";
import Footer from "../footer/footer.jsx";
import { Outlet } from "react-router-dom";

function Home() {
	return (
		<>
			<div className="flex flex-1 bg-gray-200 pt-10">
				<Sidebar />
				<main className="h-full w-full px-10">
					<Outlet />
				</main>
			</div>
			<Footer />
		</>
	);
}

export default Home;
