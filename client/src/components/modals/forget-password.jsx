import { InputData } from "./createUser";
import Modal from "./modal.jsx";
import Icon from "../accesories/icon";
import Logo from "../../../public/image/OIG21.jpeg";

function ForgetPassword({ handleCloseModal }) {
	const handleSendEmail = () => {
		// Lógica para enviar el correo electrónico
		// Aquí puedes implementar la funcionalidad para enviar el correo electrónico
		// Esta función puede ser extendida según los requerimientos de tu aplicación
		console.log("Enviar correo electrónico");
	};

	return (
		<Modal>
			<div
				className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 p-10"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="bg-white w-[800px] min-h-[400px] rounded-xl shadow-2xl flex flex-col items-center gap-5 p-8 relative">
					<button
						className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
						onClick={handleCloseModal}
					>
						<Icon iconName="x" />
					</button>
					<img src={Logo} alt="Logo de la empresa" className="mx-auto h-20" />
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
		</Modal>
	);
}

export default ForgetPassword;
