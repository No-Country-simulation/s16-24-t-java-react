
import { useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import axios from "axios";

import { useTranslation } from "react-i18next";

import Modal from "./modal.jsx";

const ciudades = [
	{ id: 1, name: "Buenos Aires" },
	{ id: 2, name: "CABA" },
	{ id: 3, name: "Catamarca" },
	{ id: 4, name: "Chaco" },
	{ id: 5, name: "Chubut" },
	{ id: 6, name: "Córdoba" },
	{ id: 7, name: "Corrientes" },
	{ id: 8, name: "Entre Ríos" },
	{ id: 9, name: "Formosa" },
	{ id: 10, name: "Jujuy" },
	{ id: 11, name: "La Pampa" },
	{ id: 12, name: "La Rioja" },
	{ id: 13, name: "Mendoza" },
	{ id: 14, name: "Misiones" },
	{ id: 15, name: "Neuquén" },
	{ id: 16, name: "Río Negro" },
	{ id: 17, name: "Salta" },
	{ id: 18, name: "San Juan" },
	{ id: 19, name: "San Luis" },
	{ id: 20, name: "Santa Cruz" },
	{ id: 21, name: "Santa Fe" },
	{ id: 22, name: "Santiago del Estero" },
	{ id: 23, name: "Tierra del Fuego" },
	{ id: 24, name: "Tucumán" },
];

const payments = [
	{
		id: 1,
		name: "Efectivo",
	},
	{
		id: 2,
		name: "Tarjeta",
	},
	{
		id: 3,
		name: "Transferencia",
	},
	{
		id: 4,
		name: "Nose que mas",
	},
];

const descuentos = [
	{ id: 0, name: "Sin descuento" },
	{ id: 1, name: "Descuento1" },
	{ id: 2, name: "Descuento2" },
	{ id: 3, name: "Descuento3" },
];

const deportes = [
	//  actividades (esta hardcodeado)
	{
		id: "football1",
		name: "Football 111111111",
	},
	{
		id: "football2",
		name: "Football 222222222",
	},
	{
		id: "natacion1",
		name: "Natacion 111111111",
	},
	{
		id: "natacion2",
		name: "Natacion 222222222",
	},
];

const subscriptions = [
	//  subscripciones (esta hardcodeado)
	{
		id: "mes",
		name: "Mensual",
	},
];

const FormOption = ({ data }) => {
	return <option value={data.id}>{data.name}</option>;
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

const CreateUser = ({ closeCallback }) => {
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastname] = useState("");
	const [phone, setPhone] = useState("");
	const [birthDate, setBirthdate] = useState("");
	const [dni, setDNI] = useState("");
	const [email, setEmail] = useState("");
	const [activity, setActivity] = useState("");
	const [subscription, setSubscription] = useState("");
	const [city, setCity] = useState("");
	const [cp, setCP] = useState("");
	const [address, setAddress] = useState("");

	const [canSubmit, setCanSubmit] = useState(false);

	const { t } = useTranslation();

	const onSubmit = async (e) => {
		// En esta funcion se envian los datos al backend
		e.preventDefault();
		if (canSubmit == true) {
			const { data } = await axios.post(
				"/api/v1/customers/create", // El base url se toma desde 'App.jsx'
				{
					personalInfoDTO: {
						firstName: firstname,
						lastName: lastname,
						phoneNumber: phone,
						email,
						dni,
						birthDate,
						address: {
							city: ciudades[city - 1].name,
							postalCode: cp,
							street: address,
						},
					},
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("sportify_jwt_access") || "NO-TENEMOS-TOKEN"}`,
						"Content-Type": "Application/json",
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
			setEmail(value);
		} else if (type == "birthDate") {
			console.log(value);
			setBirthdate(value);
		} else if (type == "dni") {
			setDNI(value);
		} else if (type == "firstname") {
			setFirstName(value);
		} else if (type == "lastname") {
			setLastname(value);
		} else if (type == "activity") {
			setActivity(value);
		} else if (type == "subscription") {
			setSubscription(value);
		} else if (type == "phone") {
			setPhone(value);
		} else if (type == "city") {
			setCity(value);
		} else if (type == "cp") {
			setCP(value);
		} else if (type == "address") {
			setAddress(value);
		}
	};

	useEffect(() => {
		if (
			isEmail(email) == true &&
			firstname.length >= 3 &&
			lastname.length >= 3 &&
			phone.length >= 8 &&
			birthDate.length >= 6 &&
			String(dni).length >= 6 &&
			activity.length >= 1 &&
			subscription.length >= 1 &&
			city > 0 &&
			address.length >= 5 &&
			cp.length >= 3
		) {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}
	}, [
		email,
		firstname,
		lastname,
		phone,
		birthDate,
		dni,
		activity,
		subscription,
		city,
		address,
		cp,
	]);
	//
	return (
		<Modal closeCallback={closeCallback}>
			<div
				className="relative inset-0 flex justify-center items-center bg-gray-100 w-[800px] h-[260px] rounded-[32px] shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<form
					action=""
					method="post"
					id="createAlumno"
					className="flex flex-col w-full h-full ml-5 mr-5 -mb-10 relative"
				>
					<InputData
						type="text"
						className={"w-[calc(33.33%-10px)] absolute left-0"}
						placeholder={t("createUserModal.firstname")}
						required={true}
						name={"firstname"}
						onChanged={onChanged}
					/>
					<InputData
						type="text"
						className={"w-[calc(33.33%-10px)] left-[calc(35%-7px)] absolute"}
						placeholder={t("createUserModal.lastname")}
						required={true}
						name={"lastname"}
						onChanged={onChanged}
					/>
					<InputData
						type="text"
						className={"w-[calc(33.33%-10px)] absolute right-0"}
						placeholder={t("createUserModal.dni")}
						required={true}
						name={"dni"}
						onChanged={onChanged}
					/>
					<InputData
						type="date"
						className={"w-[calc(33.3%-10px)] absolute left-0 top-[75px]"}
						placeholder={t("createUserModal.fechaNacimiento")}
						required={true}
						name={"birthDate"}
						onChanged={onChanged}
					/>
					<InputData
						type="text"
						className={
							"w-[calc(33.3%-10px)] absolute left-[calc(35%-7px)] top-[75px]"
						}
						placeholder={t("createUserModal.email")}
						required={true}
						name={"email"}
						onChanged={onChanged}
					/>
					<InputData
						type="text"
						className={"w-[calc(33.3%-10px)] absolute right-0 top-[75px]"}
						placeholder={t("createUserModal.telContacto")}
						required={true}
						name={"phone"}
						onChanged={onChanged}
					/>

					<Selectable
						className={"w-[calc(30%-5px)] absolute left-0 top-[150px]"}
						placeholder={t("createUserModal.ciudad")}
						name={"city"}
						forForm={"createAlumno"}
						required={true}
						onChanged={onChanged}
						selectableArray={ciudades}
						t={t}
					/>

					<InputData
						type="text"
						className={
							"w-[calc(20%-5px)] absolute left-[calc(30%+10px)] top-[150px]"
						}
						placeholder={t("createUserModal.cp")}
						required={true}
						name={"cp"}
						onChanged={onChanged}
					/>

					<InputData
						type="text"
						className={"w-[calc(50%-17px)] absolute right-0 top-[150px]"}
						placeholder={t("createUserModal.direccion")}
						required={true}
						name={"address"}
						onChanged={onChanged}
					/>
				</form>
			</div>
			<div
				className="hidden relative inset-0 justify-center items-center m bg-gray-100 w-[800px] h-[190px] rounded-[32px] shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col w-full h-full ml-5 mr-5 -mb-10 relative">
					<Selectable
						className={"w-full absolute right-0 top-0"}
						placeholder={t("createUserModal.seleccionarActividad")}
						name={"activity"}
						forForm={"createAlumno"}
						required={true}
						onChanged={onChanged}
						selectableArray={deportes}
						t={t}
					/>
					<Selectable
						className={"w-[calc(100%-25%-15px)] absolute left-0 top-[75px]"}
						placeholder={t("createUserModal.seleccionarSubscripcion")}
						name={"subscription"}
						forForm={"createAlumno"}
						required={true}
						onChanged={onChanged}
						selectableArray={subscriptions}
						t={t}
					/>
					<Selectable
						className={"w-[25%] absolute right-0 top-[75px]"}
						placeholder={t("createUserModal.seleccionarDescuento")}
						name={"descuento"}
						forForm={"createAlumno"}
						required={true}
						onChanged={onChanged}
						selectableArray={descuentos}
						t={t}
					/>
				</div>
			</div>
			<div
				className="relative inset-0 flex justify-center items-center m bg-gray-100 w-[800px] h-[80px] rounded-[32px] shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col w-full h-full ml-5 mr-5 -mb-10 relative">
					<input
						type="button"
						disabled={!canSubmit}
						onClick={onSubmit}
						value={t("createUserModal.guardar")}
						className="right-0 flex absolute transition-[background,color] rounded-full bg-green-500 hover:bg-green-600 w-[120px] h-[40px] text-white font-bold cursor-pointer shadow-md
				disabled:text-slate-500 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-300"
					/>
					<input
						type="button"
						value={t("createUserModal.cancelar")}
						onClick={() => closeCallback()}
						className="left-0 flex absolute transition-[background] rounded-full bg-red-500 w-[120px] h-[40px] text-white font-bold cursor-pointer shadow-md
				hover:bg-red-600"
					/>
					<p
						className={`absolute h-[40px] right-[140px] transition-[opacity] ${canSubmit == true ? "opacity-0" : "opacity-100"} text-center content-center font-medium`}
					>
						{t("createUserModal.completarAviso")}
					</p>
				</div>
			</div>
		</Modal>
	);
};

export { Selectable, InputData };

export default CreateUser;
