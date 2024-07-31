import { FaWhatsapp, FaDiscord, FaEnvelope } from "react-icons/fa";
import Logo from "../../../public/image/Logo.png";

function TechnicalSupport() {
	return (
		<div className="max-w-md mx-auto mt-40 p-6 bg-white shadow-xl rounded-lg">
			<img src={Logo} className="mx-auto mb-4" alt="Logo" />
			<h2 className="text-xl font-semibold mb-4">
				Contacto de Soporte Técnico
			</h2>
			<ul className="space-y-2">
				<li className="flex items-center">
					<FaWhatsapp className="h-5 w-5 mr-2 text-green-500" />
					<span className="mr-2">WhatsApp:</span>
					<a
						href="https://wa.me/tunumerodewhatsapp"
						className="text-blue-500 hover:underline"
					>
						WhatsApp
					</a>
				</li>
				<li className="flex items-center">
					<FaDiscord className="h-5 w-5 mr-2 text-purple-500" />
					<span className="mr-2">Discord:</span>
					<a
						href="https://discord.com/yourdiscord"
						className="text-blue-500 hover:underline"
					>
						Discord
					</a>
				</li>
				<li className="flex items-center">
					<FaEnvelope className="h-5 w-5 mr-2 text-red-500" />
					<span className="mr-2">Gmail:</span>
					<a
						href="mailto:support-sportify@gmail.com"
						className="text-blue-500 hover:underline"
					>
						support-sportify@gmail.com
					</a>
				</li>
			</ul>
		</div>
	);
}

export default TechnicalSupport;
