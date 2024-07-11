import React, { useState } from "react";

function Login() {
	const [isLoggingIn, setIsLoggingIn] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Aquí puedes manejar la lógica para enviar los datos al servidor
		console.log("Username:", username);
		console.log("Password:", password);
		// Resetear los campos después del envío (opcional)
		setUsername("");
		setPassword("");
	};

	const toggleLogin = () => {
		setIsLoggingIn(true);
	};

	const toggleRegister = () => {
		setIsLoggingIn(false);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					{isLoggingIn ? (
						<div className="text-center">
							<h2 className="text-3xl font-extrabold text-gray-900">Log In</h2>
							<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
								<input type="hidden" name="remember" value="true" />
								<div className="rounded-md shadow-sm -space-y-px">
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
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
											placeholder="Password"
											value={password}
											onChange={handlePasswordChange}
										/>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<input
											id="remember_me"
											name="remember_me"
											type="checkbox"
											className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
										/>
										<label
											htmlFor="remember_me"
											className="ml-2 block text-sm text-gray-900"
										>
											Remember me
										</label>
									</div>

									<div className="text-sm">
										<button
											type="submit"
											className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Log In
										</button>
									</div>
								</div>
							</form>
							<p className="mt-2 text-sm text-gray-600">
								¿No tienes una cuenta?{" "}
								<button
									onClick={toggleRegister}
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Registrar
								</button>
							</p>
						</div>
					) : (
						<div className="text-center">
							<h2 className="text-3xl font-extrabold text-gray-900">
								Register
							</h2>
							<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
								<input type="hidden" name="remember" value="true" />
								<div className="rounded-md shadow-sm -space-y-px">
									<div>
										<label htmlFor="newUsername" className="sr-only">
											Choose a username
										</label>
										<input
											id="newUsername"
											name="newUsername"
											type="text"
											autoComplete="username"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
											placeholder="Choose a username"
											value={username}
											onChange={handleUsernameChange}
										/>
									</div>
									<div>
										<label htmlFor="newPassword" className="sr-only">
											Choose a password
										</label>
										<input
											id="newPassword"
											name="newPassword"
											type="password"
											autoComplete="new-password"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
											placeholder="Choose a password"
											value={password}
											onChange={handlePasswordChange}
										/>
									</div>
								</div>

								<div>
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Register
									</button>
								</div>
							</form>
							<p className="mt-2 text-sm text-gray-600">
								¿Ya tienes una cuenta?{" "}
								<button
									onClick={toggleLogin}
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Log In
								</button>
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Login;
