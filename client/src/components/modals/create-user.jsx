import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Modal from "./modal.jsx";
import { CUSTOMERS_DATA } from "../../lib/const.js";

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
			<label htmlFor={name} className="flex h-[18px] font-medium">{placeholder}</label>
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
	const [customer, setCustomer] = useState({});
	const [canSubmit, setCanSubmit] = useState(false);

	const { t } = useTranslation();
	const handleChange = (type, event) => {
		const { name, value } = event.target;
		if (name === CUSTOMERS_DATA.city || name === CUSTOMERS_DATA.postalCode || name === CUSTOMERS_DATA.street) {
			setCustomer({ ...customer, personalInfoDTO: { ...customer.personalInfoDTO, address: { ...customer.personalInfoDTO.address, [name]: value } } });
		} else if (name === CUSTOMERS_DATA.membership) {
			setCustomer({ ...customer, membershipDTO: { ...customer.membershipDTO, [name]: value } });
		} else if (name === CUSTOMERS_DATA.sport) {
			setCustomer({ ...customer, [name]: value });
		} else {
			setCustomer({ ...customer, personalInfoDTO: { ...customer.personalInfoDTO, [name]: value } });
		}
	};
	const handleSubmit = async (e) => {
		// En esta funcion se envian los datos al backend
		e.preventDefault();
		if (canSubmit == true) {
			const { data } = await axios.post(
				"/api/v1/customers/create", // El base url se toma desde 'App.jsx'
				customer,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("sportify_jwt_access") || "NO-TENEMOS-TOKEN"}`,
						"Content-Type": "Application/json",
					},
				},
			);
			console.log("Estos datos devuelve el backend:", data);
		} else {
			console.log("Hay datos que faltan por completar o se rellenaron mal");
		}
	};

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
					{/* TODO - Cambiar estilos de todos los inputs */}
					<InputData
						type="text"
						className={"w-[calc(33.33%-10px)] absolute left-0"}
						placeholder={t("createUserModal.firstname")}
						required={true}
						name={"firstName"}
						onChanged={handleChange}
					/>
					<InputData
						type="text"
						className={"w-[calc(33.33%-10px)] left-[calc(35%-7px)] absolute"}
						placeholder={t("createUserModal.lastname")}
						required={true}
						name={"lastName"}
						onChanged={handleChange}
					/>
					<InputData
						type="text"
						className={"w-[calc(33.33%-10px)] absolute right-0"}
						placeholder={t("createUserModal.dni")}
						required={true}
						name={"dni"}
						onChanged={handleChange}
					/>
					<InputData
						type="date"
						className={"w-[calc(33.3%-10px)] absolute left-0 top-[75px]"}
						placeholder={t("createUserModal.fechaNacimiento")}
						required={true}
						name={"birthDate"}
						onChanged={handleChange}
					/>
					<InputData
						type="text"
						className={
							"w-[calc(33.3%-10px)] absolute left-[calc(35%-7px)] top-[75px]"
						}
						placeholder={t("createUserModal.email")}
						required={true}
						name={"email"}
						onChanged={handleChange}
					/>
					<InputData
						type="text"
						className={"w-[calc(33.3%-10px)] absolute right-0 top-[75px]"}
						placeholder={t("createUserModal.telContacto")}
						required={true}
						name={"phoneNumber"}
						onChanged={handleChange}
					/>

					{/* TODO cambiar por input */}
					<InputData type="text" className={
						"w-[calc(20%)] absolute left-[10px] top-[150px]"
					} placeholder={t("createUserModal.city")} required={true} name={"city"} onChanged={handleChange} />


					<InputData
						type="text"
						className={
							"w-[calc(20%-5px)] absolute left-[calc(30%+10px)] top-[150px]"
						}
						placeholder={t("createUserModal.cp")}
						required={true}
						name={"postalCode"}
						onChanged={handleChange}
					/>

					<InputData
						type="text"
						className={"w-[calc(50%-17px)] absolute right-0 top-[150px]"}
						placeholder={t("createUserModal.direccion")}
						required={true}
						name={"street"}
						onChanged={handleChange}
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
						onChanged={handleChange}
						selectableArray={deportes}
						t={t}
					/>
					<Selectable
						className={"w-[calc(100%-25%-15px)] absolute left-0 top-[75px]"}
						placeholder={t("createUserModal.seleccionarSubscripcion")}
						name={"subscription"}
						forForm={"createAlumno"}
						required={true}
						onChanged={handleChange}
						selectableArray={subscriptions}
						t={t}
					/>
					<Selectable
						className={"w-[25%] absolute right-0 top-[75px]"}
						placeholder={t("createUserModal.seleccionarDescuento")}
						name={"descuento"}
						forForm={"createAlumno"}
						required={true}
						onChanged={handleChange}
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
						onClick={handleSubmit}
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
