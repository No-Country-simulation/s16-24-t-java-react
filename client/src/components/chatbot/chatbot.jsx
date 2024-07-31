import { useRef, useState } from "react";
import ChatbotChat from "./chatbot-chat";
import Icon from "../accesories/icon";

function Chatbot() {
	const [chatbotOpen, setChatbotOpen] = useState(false);
	const chatbotRef = useRef(null);

	const toggleChatbot = () => {
		setChatbotOpen((prev) => !prev); // Cambia el estado al contrario del estado anterior
	};

	return (
		<>
			{chatbotOpen ? (
				<div className="absolute top-0 left-0 w-screen h-screen" onClick={(e) => {
					e.stopPropagation();
					setChatbotOpen(false)
				}}/>
				) : undefined
			}

			<button
				className="fixed bottom-4 right-4 bg-primary-40 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
				onClick={toggleChatbot}
			>
				{chatbotOpen ? (
					<Icon
						iconName="arrow_down"
						fill="none"
						stroke="currentColor"
						width="24"
					/>
				) : (
					<Icon iconName="bot" fill="none" stroke="currentColor" width="24" />
				)}
			</button>

			{chatbotOpen && (
				<div
					ref={chatbotRef}
					className="fixed bottom-16 right-4 max-w-xl max-h-[60vh] overflow-y-auto bg-white rounded-lg p-4 shadow-lg"
				>
					<ChatbotChat />
				</div>
			)}
		</>
	);
}

export default Chatbot;
