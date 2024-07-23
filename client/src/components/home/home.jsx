import Sidebar from "../sidebar/sidebar.jsx";
import Footer from "../footer/footer.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Chatbot from "../chatbot/chatbot.jsx";

function Home() {

	const { pathname } = useLocation();
	return (
		<>
			<div className="flex flex-1 bg-gray-200 pt-10">
				<Sidebar />
				<main className="h-full w-full px-10">
					<Outlet context={pathname}/>
				</main>
			</div>
			<Chatbot />
			<Footer />
		</>
	);
}

export default Home;
