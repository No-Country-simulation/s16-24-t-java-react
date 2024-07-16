import { useState } from "react"; // Asumiendo que useState está importado para gestionar el estado
import { InputData, NoUsarEsteModal } from "./createUser";
import Icon from "../accesories/icon";

function ForgetPassword() {
	const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(true); // Estado para mostrar/ocultar el modal

	const handleCloseModal = () => {
		setShowForgetPasswordModal(false);
	};

	const handleSendEmail = () => {
		// Lógica para enviar el correo electrónico
		// Aquí puedes implementar la funcionalidad para enviar el correo electrónico
		// Esta función puede ser extendida según los requerimientos de tu aplicación
		console.log("Enviar correo electrónico");
	};

	return (
		<>
			{showForgetPasswordModal && (
				<NoUsarEsteModal>
					<div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75">
						<div className="bg-white w-[800px] h-[360px] rounded-[32px] shadow-2xl flex flex-col items-center gap-5 p-8 relative">
							<button
								className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
								onClick={handleCloseModal}
							>
								<Icon iconName="x" />
							</button>
							<img
								src="src/assets/OIG21.jpeg"
								alt="Logo de la empresa"
								className="mx-auto h-20"
							/>
							<h3 className="text-2xl font-bold mb-4">
								Ingresa tu correo electrónico
							</h3>

							<InputData
								type="text"
								name="email"
								placeholder="Email"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-200 mb-4"
							/>
							<button
								onClick={handleSendEmail}
								className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
							>
								Enviar
							</button>
						</div>
					</div>
				</NoUsarEsteModal>
			)}
		</>
	);
}

export default ForgetPassword;
