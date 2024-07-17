import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import axios from "axios";

import { useTranslation } from "react-i18next";

const deportes = [
	//  actividades (esta hardcodeado)
	{
		id: "football1",
		name: "Football Niños",
	},
	{
		id: "football2",
		name: "Football Adultos",
	},
	{
		id: "natacion1",
		name: "Natacion Niños",
	},
	{
		id: "natacion2",
		name: "Natacion Adultos",
	},
];

const subscriptions = [
	//  subscripciones (esta hardcodeado)
	{
		id: "mes",
		name: "Mensual",
	},
	{
		id: "trimestre",
		name: "Trimestral",
	},
	{
		id: "semestre",
		name: "Semestral",
	},
	{
		id: "anual",
		name: "Anual",
	},
];

const FormOption = ({ data }) => {
	return <option value={data.id}>{data.name}</option>;
};

const Modal = ({ children, closeCallback }) => {
	const backgroundClick = (e) => {
		e.stopPropagation();
		if (closeCallback) {
			closeCallback();
		}
	};

	return (
		<div
			className="flex items-center content-center flex-wrap justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.65)] fixed"
			onClick={backgroundClick}
		>
			{children}
		</div>
	);
};
// Para componentes invalidos usar estos estilos:  border-red-400 border-[1px]
const InputData = ({
	type,
	required,
	onChanged,
	name,
	className,
	placeholder,
}) => {
	return (
		<div
			className={
				"bg-transparent h-[64px] flex flex-col gap-[10px] " +
				(className ? " " + className : "")
			}
		>
			<label className="flex h-[18px] font-medium">{placeholder}</label>
			<div className={"rounded-full bg-gray-200 h-[55%] flex shadow-inner"}>
				<input
					className={
						"w-[calc(100%-20px)] h-full bg-transparent mx-[10px] outline-none focus:bg-transparent"
					}
					type={type}
					name={name}
					placeholder={""}
					required={required | true}
					onChange={(e) => onChanged(name, e)}
				/>
			</div>
		</div>
	);
};

const Selectable = ({
	name,
	forForm,
	required,
	className,
	onChanged,
	selectableArray,
	placeholder,
	t,
}) => {
	return (
		<div
			className={
				"bg-transparent h-[64px] flex flex-col gap-[10px] " +
				(className ? " " + className : "")
			}
		>
			<label className="flex h-[18px] left-[5px] font-medium">
				{placeholder}
			</label>
			<div
				className={"h-[34px] w-[100%] bg-gray-200 rounded-full shadow-inner"}
			>
				<select
					className={
						"w-[calc(100%-20px)] h-full bg-transparent mx-[10px] outline-none cursor-pointer"
					}
					name={name}
					form={forForm}
					required={required | true}
					onChange={(e) => onChanged(name, e)}
					defaultValue={"DEFAULT"}
				>
					<option disabled value="DEFAULT">
						{t("createUserModal.elegirSelectable")}
					</option>
					{selectableArray.map((element, key) => {
						return <FormOption data={element} key={key} />;
					})}
				</select>
			</div>
		</div>
	);
};

const CreateUser = ({ handleNewMember }) => {
	const [fullname, setFullname] = useState("");
	const [birthDate, setBirthdate] = useState("");
	const [dni, setDNI] = useState("");
	const [email, setEmail] = useState("");
	const [activity, setActivity] = useState("");
	const [subscription, setSubscription] = useState("");

	const { t } = useTranslation();

	const onSubmit = async (e) => {
		e.preventDefault();

		console.log("Submit button!");
		if (
			fullname.length >= 3 &&
			birthDate.length >= 6 &&
			dni.length >= 5 &&
			isEmail(email) &&
			activity.length >= 1 &&
			subscription.length >= 1
		) {
			const { data } = await axios.post(
				"/api/endpoint/noseIDK",
				{
					fullname,
					birthDate,
					dni,
					email,
					activity,
				},
				{
					headers: {
						["Content-Type"]: "Application/json",
					},
				},
			);

			console.log("Estos datos devuelve el backend:");
			console.log(data);
		} else {
			console.log("Hay datos que faltan por completar o se rellenaron mal");
		}
	};

	const onChanged = (type, event) => {
		const value = event.target.value;
		if (type == "email") {
			if (isEmail(value)) {
				console.log("email validado!");
				setEmail(value);
				event.target.classList.add("bg");
			} else {
				setEmail("");
			}
		} else if (type == "birth") {
			setBirthdate(value);
		} else if (type == "dni" && value.length >= 5) {
			setDNI(value);
		} else if (type == "fullname") {
			setFullname(value);
		} else if (type == "activity") {
			setActivity(value);
		} else if (type == "subscription") {
			setSubscription(value);
		}
	};

	//
	return (
		<Modal>
			<div className="relative inset-0 flex justify-center items-center bg-gray-100 w-[800px] h-[310px] rounded-[32px] shadow-2xl">
				<form
					action=""
					method="post"
					id="createAlumno"
					className="flex flex-col w-full h-full ml-5 mr-5 -mb-10 relative"
				>
					<InputData
						type="text"
						className={"w-[calc(50%-10px)] absolute left-0"}
						placeholder={t("createUserModal.nombrecompleto")}
						required={true}
						name={"fullname"}
						onChanged={onChanged}
					/>
					<InputData
						type="text"
						className={"w-[calc(50%-10px)] absolute right-0"}
						placeholder={t("createUserModal.dni")}
						required={true}
						name={"dni"}
						onChanged={onChanged}
					/>

					<InputData
						type="date"
						className={"w-[calc(33.3%-10px)] absolute left-0 top-[70px]"}
						placeholder={t("createUserModal.fechaNacimiento")}
						required={true}
						name={"birthDate"}
						onChanged={onChanged}
					/>
					<InputData
						type="text"
						className={
							"w-[calc(33.3%-10px)] absolute left-[calc(35%-5px)] top-[70px]"
						}
						placeholder={t("createUserModal.email")}
						required={true}
						name={"email"}
						onChanged={onChanged}
					/>
					<InputData
						type="text"
						className={"w-[calc(33.3%-10px)] absolute right-0 top-[70px]"}
						placeholder={t("createUserModal.telContacto")}
						required={true}
						name={"phone"}
						onChanged={onChanged}
					/>

					<Selectable
						className={"w-[calc(50%-10px)] absolute right-0 top-[140px]"}
						placeholder={t("createUserModal.seleccionarActividad")}
						name={"activity"}
						forForm={"createAlumno"}
						required={true}
						onChanged={onChanged}
						selectableArray={deportes}
						t={t}
					/>
					<Selectable
						className={"w-[calc(50%-10px)] absolute left-0 top-[140px]"}
						placeholder={t("createUserModal.seleccionarSubscripcion")}
						name={"subscription"}
						forForm={"createAlumno"}
						required={true}
						onChanged={onChanged}
						selectableArray={subscriptions}
						t={t}
					/>
				</form>
				<input
					type="button"
					disabled
					value={t("createUserModal.guardar")}
					className="bottom-[20px] right-[20px] flex absolute rounded-full bg-green-500 hover:bg-green-600 w-[120px] h-[40px] text-white font-bold cursor-pointer shadow-md
				disabled:text-slate-500 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-300"
				/>
				<input
					type="button"
					onClick={handleNewMember}
					value={t("createUserModal.cancelar")}
					className="bottom-[20px] left-[20px] flex absolute rounded-full bg-red-500 w-[120px] h-[40px] text-white font-bold cursor-pointer shadow-md
				hover:bg-red-600"
				/>
				<p className="absolute h-[40px] bottom-[20px] right-[155px] text-center content-center font-medium ">
					{t("createUserModal.completarAviso")}
				</p>
			</div>
		</Modal>
	);
};

export const NoUsarEsteModal = Modal;
export { Selectable, InputData };

export default CreateUser;
