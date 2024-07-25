import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/login-context.jsx";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import axios from "axios";
import ForgetPassword from "../modals/forget-password.jsx";
import Logo from "../../../public/image/Logo.png";

function Login() {
	const [username, setUsername] = useState("admin@sportify.com");
	const [password, setPassword] = useState("admin");
	const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
	const { handleLogin, handleIsLogged, setUser } = useContext(LoginContext);

	const { t } = useTranslation();

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleLogin();
		const { data } = await axios.post("/auth/login", {
			email: username,
			password: password,
		});
		if (data.role) {
			setUser({username: data.username, role: data.role});
			handleIsLogged(data.token);
		} else {
			console.log("Usuario o contraseña incorrectos");

			Swal.fire({
				icon: "error",
				title: "Error de inicio de sesión",
				text: "Usuario o contraseña incorrectos",
			});
		}

		setUsername("");
		setPassword("");
	};

	const handleForgetPasswordClick = () => {
		setShowForgetPasswordModal(!showForgetPasswordModal);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-20 to-secondary-50 font-nunito">
			<div className="bg-slate-50/10 backdrop-blur-xl h-full shadow-2xl items-center shadow-black/30 rounded-2xl flex p-8 gap-10">
				{/* Imagen a la izquierda */}
				<div className="w-full flex flex-col gap-5 items-center">
					<img src={Logo} alt="Logo de la empresa" className="w-auto aspect-auto h-72" />
					<h1 className="text-4xl font-bold text-primary-0">SportiFy</h1>
				</div>
				{/* Formulario a la derecha */}

				<form className="w-full px-10 flex-col flex gap-6 text-primary-0 font-semibold h-full justify-center" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username" className="sr-only">
							Username
						</label>
						<input
							id="username"
							name="username"
							type="text"
							autoComplete="username"
							required
							className="min-w-96 px-6 py-2 rounded-full shadow-inner shadow-black/40 "
							placeholder="Username"
							value={username}
							onChange={handleUsernameChange}
						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="min-w-96 px-6 py-2 rounded-full shadow-inner shadow-black/40"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<div className="flex flex-col gap-4">
						<a
							onClick={handleForgetPasswordClick}
							className="text-sm text-primary-20 font-semibold hover:text-primary-0 block text-end"
						>
							{t('login.forget_password')}
						</a>
						<div className="flex gap-32">
							<div className="flex items-center">
								<input
									id="remember_me"
									name="remember_me"
									type="checkbox"
									className="h-4 w-4 accent-primary-30 border-primary-40"
								/>
								<label
									htmlFor="remember_me"
									className="ml-2 block text-sm text-primary-0"
								>
									{t('login.remember_me')}
								</label>
							</div>
							<button
								type="submit"
								className="w-full py-2 rounded-full shadow-md shadow-primary-0  font-semibold text-primary-0 bg-white hover:text-white hover:bg-primary-20 active:shadow-none"
							>
								{t('login.login')}
							</button>
						</div>

					</div>
				</form>
			</div>
			{/* Modal de recuperación de contraseña */}
			{showForgetPasswordModal && (
				<ForgetPassword handleCloseModal={handleForgetPasswordClick} />
			)}
		</div>
	);
}

export default Login;
