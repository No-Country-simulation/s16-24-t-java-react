import { useState } from "react";

const ChatbotChat = () => {
	const [messages, setMessages] = useState([]);
	const [inputText, setInputText] = useState("");

	const handleInputChange = (e) => {
		setInputText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Agregar lógica para procesar la entrada del usuario
		const userMessage = inputText.trim().toLowerCase(); // Normalizamos el texto del usuario

		let botResponse = "";

		// Lógica de respuestas del bot
		if (userMessage === "hola") {
			botResponse =
				"¡Hola! ¿En qué puedo ayudarte?, recuerda que la informacion que te puedo brindar es sobre membresias, para respuestas tecnicas dirigite a la barra de opciones y haz click en el soporte tecnico";
		} else if (userMessage === "adios") {
			botResponse = "¡Adiós! Espero haberte ayudado.";
		} else if (userMessage.includes("membresia")) {
			botResponse = "las membresias existentes son : Gold , Black, Platinum";
		} else {
			botResponse = "Lo siento, no entendí tu mensaje.";
		}

		setMessages([
			...messages,
			{ text: inputText, sender: "user" },
			{ text: botResponse, sender: "bot" },
		]);
		setInputText("");
	};

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex-grow p-4 bg-gray-100 overflow-y-auto">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"
							} mb-2`}
					>
						<div
							className={`rounded-lg p-2 ${message.sender === "bot" ? "bg-blue-200" : "bg-green-200"
								}`}
						>
							{message.text}
						</div>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="flex p-4">
				<input
					type="text"
					className="flex-grow rounded-lg p-2 mr-2"
					placeholder="Escribe tu mensaje"
					value={inputText}
					onChange={handleInputChange}
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
				>
					Enviar
				</button>
			</form>
		</div>
	);
};

export default ChatbotChat;
