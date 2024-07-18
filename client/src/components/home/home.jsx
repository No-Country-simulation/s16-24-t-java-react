import Sidebar from "../sidebar/sidebar.jsx";
import Footer from "../footer/footer.jsx";
import Table from "../table/table.jsx";
import { UsersProvider } from "../table/usersInfoContext.jsx";

function Home({ handleLogOut }) {
	return (
		<>
			<div className="flex flex-1 bg-gray-200">
				<Sidebar />
				<main className="h-full w-full px-10">
				<UsersProvider>
				<Table handleLogOut={handleLogOut} />
				</UsersProvider>
				</main>
			</div>
			<Footer />
		</>
	);
}

export default Home;
