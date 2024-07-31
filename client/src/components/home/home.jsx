import Sidebar from "../sidebar/sidebar.jsx";
import Footer from "../footer/footer.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Chatbot from "../chatbot/chatbot.jsx";
import { PATHS } from "../../lib/const.js";

function Home() {

	const { pathname } = useLocation();

	return (
		<>
			<div className="flex flex-1 bg-gradient-to-br from-primary-80 via-40% via-white to-secondary-80">
				<Sidebar />
				<main className="h-full w-full">
					<Outlet context={pathname}/>
				</main>
			</div>
			{pathname !== PATHS.ACTIVITIES && <Chatbot />}
			<Footer />
		</>
	);
}

export default Home;
