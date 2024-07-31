import Modal from "./modal.jsx";
import Icon from "../accesories/icon";
import Logo from "../../../public/image/Logo.png";
import { useState } from "react";

function ForgetPassword({ handleCloseModal }) {
	const [email, setEmail] = useState("");

	const handleChange = (e) => {
		setEmail(e.target.value);
	}
	const handleSendEmail = () => {
		
		console.log("Enviar correo electrónico");
	};

	return (
		<Modal>
			<div
				className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 p-10"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="bg-gradient-to-br from-primary-70 via-40% via-white to-secondary-70 min-w-[800px] min-h-[400px] rounded-xl shadow-2xl flex flex-col items-center gap-5 p-8 relative">
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

					<div className="flex flex-col gap-4 justify-center items-center">
						<label htmlFor="email" className="sr-only">
							Email
						</label>
						<input
							name="email"
							type="email"
							className="min-w-96 px-6 py-2 rounded-full shadow-inner focus:outline-primary-40 shadow-black/40 border-secondary-30 border"
							placeholder="sportify@example.com"
							value={email}
							onChange={handleChange}
						/>
					</div>
					<button
						onClick={handleSendEmail}
						className="px-6 py-2 rounded-full shadow-md shadow-primary-0  font-semibold text-primary-0 bg-white hover:text-white hover:bg-primary-20 active:shadow-none"
					>
						Enviar
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default ForgetPassword;
