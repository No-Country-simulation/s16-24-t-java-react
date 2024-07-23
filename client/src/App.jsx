import { useEffect, useContext, useState, useRef } from "react";
import { LoginContext } from "./contexts/login-context.jsx";
import Home from "../src/components/home/home.jsx";
import Login from "./components/login/login.jsx";
import LoginSpinner from "./components/login/login-spinner.jsx";
import Chatbot from "./components/chatbot/chatbot.jsx";
import axios from "axios";

axios.defaults.baseURL = "https://sportify-xric.onrender.com";

function App() {
	const { isLogged, handleIsLogged, isLogin } = useContext(LoginContext);
	const [chatbotOpen, setChatbotOpen] = useState(false);
	const chatbotRef = useRef(null); // Ref para el contenedor del Chatbot

	useEffect(() => {
		const loggedInStatus = localStorage.getItem("sportify_jwt_access");
		if (loggedInStatus) {
			handleIsLogged(loggedInStatus);
		}

		// Agregar el event listener para detectar clics fuera del chatbot
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Función para manejar clics fuera del chatbot
	const handleClickOutside = (event) => {
		if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
			setChatbotOpen(false);
		}
	};

	const toggleChatbot = () => {
		setChatbotOpen(!chatbotOpen);
	};

	return (
		<div className="App min-h-screen flex flex-col relative">
			<div className="flex-grow">
				{!isLogin && !isLogged && <Login />}
				{isLogin && !isLogged && <LoginSpinner />}
				{isLogged && <Home />}
			</div>

			<button
				className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
				onClick={toggleChatbot}
			>
				{chatbotOpen ? (
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				) : (
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 15v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
						/>
					</svg>
				)}
			</button>

			{chatbotOpen && (
				<div
					ref={chatbotRef}
					className="fixed bottom-16 right-4 max-w-xs max-h-96 overflow-y-auto bg-white rounded-lg p-4 shadow-lg"
					style={{ maxHeight: "60vh" }}
				>
					<Chatbot />
				</div>
			)}
		</div>
	);
}

export default App;
