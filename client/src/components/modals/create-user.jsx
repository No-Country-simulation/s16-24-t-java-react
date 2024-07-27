import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Modal from "./modal.jsx";
import { CUSTOMERS_DATA, STAFF_CATEGORIES, DISCOUNTS, MEMBERSHIP } from "../../lib/const.js";
import InputCreateModal from "../accesories/input-create-modal.jsx";
import Icon from "../accesories/icon.jsx";
import { ComplexContext } from "../../contexts/complex-context.jsx";


const CreateUser = ({handleCreateModal, handleRefresh}) => {
	const [customer, setCustomer] = useState({});
	const [selectedComplex, setSelectedComplex] = useState(null);
	const [activities, setActivities] = useState([]);
	const [errors, setErrors] = useState([]);

	const { rawComplexes } = useContext(ComplexContext);
	const { t } = useTranslation();

	useEffect(() => {
		if (selectedComplex) {
			console.log("acitvidades", selectedComplex.activities);
			setActivities(selectedComplex.activities);
		}
	}, [selectedComplex]);
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

	const handleSelectedComplex = (e) => {
		const { value } = e.target;
		const [selectedcomplex] = rawComplexes.filter((complex) => complex.cuit === value);
		setSelectedComplex(selectedcomplex);
		console.log("selected complex", selectedcomplex);
	}
	const handleSubmit = async (e) => {
		// En esta funcion se envian los datos al backend
		e.preventDefault();
		// const { data } = await axios.post(
		// 	"/api/v1/customers/create", // El base url se toma desde 'App.jsx'
		// 	customer,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${localStorage.getItem("sportify_jwt_access")}`,
		// 			"Content-Type": "Application/json",
		// 		},
		// 	},
		// );
		// console.log("Estos datos devuelve el backend:", data);
	};

	return (
		<Modal>
			<div className="relative flex bg-gradient-to-b from-primary-80 via-20% via-white  to-secondary-80  w-[1100px] min-h-[450px] rounded-xl drop-shadow-2xl shadow-2xl shadow-black/60 flex-col p-10 items-center text-primary-0" onClick={(e) => e.stopPropagation()} >
				<button className="absolute top-4 right-4" onClick={handleCreateModal}><Icon iconName="x" /></button>
				<h2 className="text-center text-3xl font-bold mb-10">{t("create_customer.title")}</h2>
				<form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-x-10 relative px-10 gap-y-6">
					<div className="flex flex-col gap-8 items-center">
						<div className="h-40 w-40 rounded-xl overflow-hidden border-primary-0 border-2">
							<img className="w-full h-full aspect-square object-cover" src="/image/ProfileImagePlaceholder.png" alt="imagen por defeceto de usuario" loading="lazy"/>
						</div>
						<InputCreateModal htmlFor="startDate" type="date" handleChange={handleChange} label={t("create_customer.start_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
						<div className="col-span-2 w-full">
						<label htmlFor="complex" className="text-primary-10 font-bold ml-5">{t('create_customer.sport')}</label>
						<select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="sport" onChange={handleSelectedComplex}>
							<option value="" selected disabled>{t("create_customer.select_complex")}</option>
							{rawComplexes.map((complex) => (
								<option key={complex.title} value={complex.cuit}>{complex.title}</option>
							))}
						</select>
					</div>
						<div className="self-start">
						<label htmlFor="discount" className="text-primary-10 font-bold ml-5">{t('create_customer.discount')}</label>
						<select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="discount" onChange={handleChange}>
							<option value="" selected disabled>{t("create_customer.discount")}</option>
							{DISCOUNTS.map((category) => (
								<option key={category} value={category}>{category}</option>
							))}
						</select>
					</div>
					</div>
					<div className="col-span-1 col-start-2 gap-2 grid grid-cols-2">
						<InputCreateModal htmlFor="firstName" type="text" handleChange={handleChange} label={t("create_customer.first_name")} />
						<InputCreateModal htmlFor="lastName" type="text" handleChange={handleChange} label={t("create_customer.last_name")} />
						<InputCreateModal htmlFor="birthDate" type="date" handleChange={handleChange} label={t("create_customer.birth_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
						<InputCreateModal htmlFor="dni" type="text" handleChange={handleChange} label={t("create_customer.dni")} />
						<InputCreateModal htmlFor="email" type="email" handleChange={handleChange} label={t("create_customer.email")} containerClassName="w-full flex flex-col gap-1 col-span-2" />
						<InputCreateModal htmlFor="city" type="text" handleChange={handleChange} label={t("create_customer.city")} />
						<InputCreateModal htmlFor="street" type="text" handleChange={handleChange} label={t("create_customer.street")} />
						<InputCreateModal htmlFor="postalCode" type="text" handleChange={handleChange} label={t("create_customer.postal_code")} />
						<InputCreateModal htmlFor="phoneNumber" type="text" handleChange={handleChange} label={t("create_customer.phone_number")} />
					</div>
					<div className="col-span-1 col-start-2 gap-2 mb-20 grid grid-cols-2">
					<div className="col-span-2">
						<label htmlFor="sport" className="text-primary-10 font-bold ml-5">{t('create_customer.sport')}</label>
						<select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="sport" onChange={handleChange}>
						<option value="" selected disabled>{t("create_customer.sport")}</option>
							{activities.map((activity) => (
								<option key={activity} value={activity}>{activity}</option>
							))}
						</select>
					</div>
					<div className="col-span-2">
						<label htmlFor="membershipType" className="text-primary-10 font-bold ml-5">{t('create_customer.membership')}</label>
						<select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="membershipType" onChange={handleChange}>
							<option value="" selected disabled>{t("create_customer.membership")}</option>
							{MEMBERSHIP.map((category) => (
								<option key={category} value={category}>{category}</option>
							))}
						</select>
					</div>
					<div className="col-span-2">
						<label htmlFor="staff" className="text-primary-10 font-bold ml-5">{t('create_customer.payment_method')}</label>
						<select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="staff" onChange={handleChange}>
							<option value="" selected disabled>{t("create_customer.payment_method")}</option>
							{STAFF_CATEGORIES.map((category) => (
								<option key={category} value={category}>{t(`create_customer.${category}`)}</option>
							))}
						</select>
					</div>
			</div>

			<div className="col-span-2 flex flex-col justify-center">
				{errors.length > 0 && errors.map((error, index) => (
					<p className="text-red-500 text-center" key={index}>{`*${t(`create_employee.${error.path[0]}`)} ${t(`create_employee.errors.${error.code}`)?.toLowerCase()}`}</p>
				))}
			</div>
			<div className="col-span-2 mt-4 flex justify-center absolute bottom-0 right-5">
				<button className="bg-secondary-0 border border-secondary-30 rounded-full shadow-md text-xl shadow-secondary-10 text-white px-16 py-2 active:shadow-none" type="submit">{t("create_employee.save")}</button>
			</div>
		</form>
			</div >
		</Modal >
	);
};

export default CreateUser;
