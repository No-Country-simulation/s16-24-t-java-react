import Header from "../header/header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Footer from "../footer/footer.jsx";
import Table from "../table/table.jsx";

function Home({ handleLogOut }) {
	return (
				<>
					<Header/>
					<div className="flex flex-1 bg-gray-200">
						<Sidebar />
						<main className="flex-1 p-0">
							<Table handleLogOut={handleLogOut}/>
						</main>
					</div>
					<Footer />
				</>
	
	);
}

export default Home;
