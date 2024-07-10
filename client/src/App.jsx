import Home from "../src/components/home/home.jsx"; // Importa el componente home
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "";

function App() {
	return (
		<>
			<div className="App">
				<Home /> {/* Renderiza el componente home */}
			</div>
		</>
	);
}

export default App;
