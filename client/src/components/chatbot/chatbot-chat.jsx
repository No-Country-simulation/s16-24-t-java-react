import { useState, useEffect } from "react";
import Logo from "../../../public/image/OIG21.jpeg";

const ChatbotChat = () => {
	const [messages, setMessages] = useState([]);
	const [inputText, setInputText] = useState("");

	// Función para mostrar el mensaje de bienvenida al cargar el componente
	useEffect(() => {
		setMessages([
			{
				text: "¡Hola! Soy Sportify Chatbot. ¿En qué puedo ayudarte?. Escribe la palabra inicio",
				sender: "bot",
			},
		]);
	}, []);

	const handleInputChange = (e) => {
		setInputText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userMessage = inputText.trim().toLowerCase();

		let botResponse = "";

		// Lógica de respuestas del bot
		if (userMessage === "inicio") {
			botResponse =
				"Recuerda que la información que te puedo brindar es sobre membresías. ¿En qué tipo de membresía estás interesado?, escribe la palabra membresia para poder recibir informacion";
		} else if (userMessage === "adios") {
			botResponse = "¡Adiós! Espero haberte ayudado.";
		} else if (userMessage.includes("membresia")) {
			// Mostrar opciones como botones con descripción y precio
			botResponse = {
				text: "Elige una membresía:",
				buttons: [
					{
						label: "Gold",
						value: "gold",
						description: "Acceso completo a todas las instalaciones.",
						price: "$100/mes",
					},
					{
						label: "Black",
						value: "black",
						description: "Acceso limitado a ciertas instalaciones.",
						price: "$75/mes",
					},
					{
						label: "Platinum",
						value: "platinum",
						description: "Acceso ilimitado y beneficios exclusivos.",
						price: "$150/mes",
					},
				],
			};
		} else {
			botResponse =
				"Lo siento, en ese tema no puedo asesorarte. Por favor, contacta al soporte técnico que se encuentra en la barra vertical derecha.";
		}

		setMessages([
			...messages,
			{ text: inputText, sender: "user" },
			{ text: botResponse, sender: "bot" },
		]);
		setInputText("");
	};

	// Función para manejar la selección de botones
	const handleButtonClick = (button) => {
		const { label, description, price } = button;
		setMessages([
			...messages,
			{ text: label, sender: "user" },
			{ text: `Descripción: ${description}`, sender: "bot" },
			{ text: `Precio: ${price}`, sender: "bot" },
		]);
	};

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex items-center mb-4">
				<img src={Logo} alt="Sportify Logo" className="w-12 h-12 mr-2" />
				<h1 className="text-2xl font-bold">Sportify Chatbot</h1>
			</div>
			<div className="flex-grow p-4 bg-gray-100 overflow-y-auto">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`flex ${
							message.sender === "bot" ? "justify-start" : "justify-end"
						} mb-2`}
					>
						<div
							className={`rounded-lg p-2 ${
								message.sender === "bot" ? "bg-tertiary-20" : "bg-primary-70"
							}`}
						>
							{typeof message.text === "object" ? (
								<>
									<p>{message.text.text}</p>
									<div className="flex mt-2">
										{message.text.buttons.map((button, btnIndex) => (
											<button
												key={btnIndex}
												className="bg-primary-20 hover:bg-primary-0 text-white rounded-lg p-2 mr-2"
												onClick={() => handleButtonClick(button)}
											>
												{button.label}
											</button>
										))}
									</div>
								</>
							) : (
								<p>{message.text}</p>
							)}
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
					className="bg-primary-20 hover:bg-primary-0 text-white rounded-lg p-2"
				>
					Enviar
				</button>
			</form>
		</div>
	);
};

export default ChatbotChat;
