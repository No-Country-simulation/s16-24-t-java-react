import { useEffect, useRef, useState } from "react";
import ChatbotChat from "./chatbot-chat";
import Icon from "../accesories/icon";

function Chatbot() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const chatbotRef = useRef(null);
  useEffect(() => {
    // Agregar el event listener para detectar clics fuera del chatbot
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

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
    <>
      <button
        className="fixed bottom-4 right-4 bg-primary-40 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        onClick={toggleChatbot}
      >
        {chatbotOpen ? (
          <Icon iconName="arrow_down" fill="none" stroke="currentColor" width="24"/>
        ) : (
          <Icon iconName="bot" fill="none" stroke="currentColor" width="24"/>
        )}
      </button>

      {chatbotOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-16 right-4 max-w-xs max-h-[60vh] overflow-y-auto bg-white rounded-lg p-4 shadow-lg"
        >
          <ChatbotChat />
        </div>
      )}
    </>

  )
}

export default Chatbot