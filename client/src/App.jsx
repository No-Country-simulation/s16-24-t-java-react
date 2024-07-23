import React, { useEffect, useContext, useState } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import { LoginContext } from "./contexts/login-context.jsx";
import Home from "../src/components/home/home.jsx";
import Login from "./components/login/login.jsx";
import LoginSpinner from "./components/login/login-spinner.jsx";
import axios from "axios";
import "react-chat-widget/lib/styles.css";

axios.defaults.baseURL = "https://sportify-xric.onrender.com";

function App() {
	const { isLogged, handleIsLogged, isLogin } = useContext(LoginContext);
	const [showChatbot, setShowChatbot] = useState(false);

	useEffect(() => {
		// Verificar si hay una sesión almacenada en localStorage al cargar la aplicación
		const loggedInStatus = localStorage.getItem("sportify_jwt_access");
		if (loggedInStatus) {
			handleIsLogged(loggedInStatus);
		}
	}, []);

	const handleNewUserMessage = (newMessage) => {
		// Convertir el mensaje a minúsculas para evitar problemas de capitalización
		const message = newMessage.toLowerCase();

		// Lógica de respuestas del chatbot
		if (message.includes("hola")) {
			addResponseMessage(
				"¡Hola! Soy el Chatbot de Sportify. ¿En qué puedo ayudarte?, recuerda que las opciones que te puedo brindar es sobre membresia, sino dirigete a la opcion soporte tecnico en la barra de opciones",
			);
		} else if (message.includes("membresia")) {
			addResponseMessage(
				"Actualmente ofrecemos tres tipos de membresías: Gold, Black y Platinum.",
			);
		} else if (message.includes("adios") || message.includes("adiós")) {
			addResponseMessage("¡Hasta luego! Que tengas un buen día.");
		} else {
			addResponseMessage("Lo siento, no tengo respuestas programadas aún.");
		}
	};

	return (
		<div className="App min-h-dvh flex flex-col max-h-dvh">
			{!isLogin && !isLogged && <Login />}
			{isLogin && !isLogged && <LoginSpinner />}
			{isLogged && <Home />}

			{/* Mostrar el widget del chatbot */}
			{isLogged && (
				<Widget
					handleNewUserMessage={handleNewUserMessage}
					title="Sportify Chatbot"
					subtitle="¡Hola! ¿En qué puedo ayudarte?"
					senderPlaceHolder="Escribe un mensaje..."
					showCloseButton={true}
					fullScreenMode={false}
					autofocus={true}
				/>
			)}
		</div>
	);
}

export default App;
