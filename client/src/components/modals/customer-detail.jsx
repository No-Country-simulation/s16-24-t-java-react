import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Modal from "./modal.jsx";
import { CUSTOMERS_DATA, MEMBERSHIP, PAYMENT_METHODS } from "../../lib/const.js";
import InputCreateModal from "../accesories/input-create-modal.jsx";
import Icon from "../accesories/icon.jsx";
import { ComplexContext } from "../../contexts/complex-context.jsx";
import { CustomerScheme } from "../../lib/zod-schemas.js";


const CustomerDetail = ({ handleEditModal, handleRefresh, customerToEdit }) => {
	const [customer, setCustomer] = useState({});
	const [selectedComplex, setSelectedComplex] = useState(null);
	const [editable, setEditable] = useState(true);
	const [activities, setActivities] = useState([]);
	const [errors, setErrors] = useState([]);

	const { rawComplexes } = useContext(ComplexContext);
	const { t } = useTranslation();

	useEffect(() => {
		if (customerToEdit) {
			setCustomer(customerToEdit);
		}
		if (selectedComplex) {
			const activities = selectedComplex.activities.map(({ activityName }) => activityName);
			const uniqueActivities = Array.from(new Set(activities))
			setActivities(uniqueActivities);
		}
	}, [selectedComplex, customerToEdit]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === CUSTOMERS_DATA.city || name === CUSTOMERS_DATA.postalCode || name === CUSTOMERS_DATA.street) {
			setCustomer({ ...customer, personalInfoDTO: { ...customer.personalInfoDTO, address: { ...customer.personalInfoDTO.address, [name]: value } } });
		} else if (name === CUSTOMERS_DATA.membership) {
			setCustomer({ ...customer, membershipDTO: { ...customer.membershipDTO, [name]: value } });
		} else if (name === CUSTOMERS_DATA.sport) {
			setCustomer({ ...customer, [name]: value });
		} else if (name === CUSTOMERS_DATA.membershipType) {
			setCustomer({ ...customer, membershipDTO: { ...customer.membershipDTO, [name]: value } });
		} else {
			setCustomer({ ...customer, personalInfoDTO: { ...customer.personalInfoDTO, [name]: value } });
		}
	};

	const handleSelectedComplex = (e) => {
		const { value } = e.target;
		const [selectedcomplex] = rawComplexes.filter((complex) => complex.cuit === value);
		setSelectedComplex(selectedcomplex);
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { success, data, error } = CustomerScheme.safeParse(customer);
		if (error) {
			console.log(error);
			setErrors(error.issues);
			return
		}
		try {
			if (success) {
				const response = await axios.put("/api/v1/customers/update", data, {
					headers: {
						"Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`,
						"Content-Type": "Application/json"
					}
				});
				if (response.data) {
					handleRefresh();
					handleEditModal();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = () => {
		setEditable(!editable);
	}

	const handleDelete = async () => {
		try {
			const response = await axios.delete(`/api/v1/customers/${customer.personalInfoDTO.dni}`, {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`,
					"Content-Type": "Application/json"
				}
			});
			if (response.data) {
				handleRefresh();
				handleEditModal();
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Modal>
			<div className="relative flex bg-gradient-to-b from-primary-80 via-20% via-white  to-secondary-80  w-[1100px] min-h-[450px] rounded-xl drop-shadow-2xl shadow-2xl shadow-black/60 flex-col p-10 items-center text-primary-0" onClick={(e) => e.stopPropagation()} >
				<div className="absolute top-4 right-4 flex gap-4">
					<button className={`${editable ? "" : "hidden"}`} onClick={handleEdit}><Icon iconName="pencil" /></button>
					<button className="" onClick={handleEditModal}><Icon iconName="x" /></button>
				</div>
				<h2 className="text-center text-3xl font-bold mb-10">{t("customer_detail.title")}</h2>
				<form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-x-10 relative px-10 gap-y-6">
					<div className="flex flex-col gap-8 items-center">
						<div className="h-40 w-40 rounded-xl overflow-hidden border-primary-0 border-2">
							<img className="w-full h-full aspect-square object-cover" src="/image/ProfileImagePlaceholder.png" alt="imagen por defeceto de usuario" loading="lazy" />
						</div>
						<InputCreateModal value={customerToEdit.personalInfoDTO.startDate} editable={true} htmlFor="startDate" type="date" handleChange={handleChange} label={t("create_customer.start_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
						<div className="col-span-2 w-full">
							<label htmlFor="complex" className="text-primary-10 font-bold ml-5">{t('create_customer.complex')}</label>
							<select disabled={editable} className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="sport" onChange={handleSelectedComplex}>
								<option value="" selected disabled>{t("create_customer.select_complex")}</option>
								{rawComplexes.map((complex) => (
									<option key={complex.title} value={complex.cuit}>{complex.title}</option>
								))}
							</select>
						</div>

					</div>
					<div className="col-span-1 col-start-2 gap-2 grid grid-cols-2">
						<InputCreateModal value={customerToEdit.personalInfoDTO.firstName} editable={editable} htmlFor="firstName" type="text" handleChange={handleChange} label={t("create_customer.first_name")} />
						<InputCreateModal value={customerToEdit.personalInfoDTO.lastName} editable={editable} htmlFor="lastName" type="text" handleChange={handleChange} label={t("create_customer.last_name")} />
						<InputCreateModal value={customerToEdit.personalInfoDTO.birthDate} editable={editable} htmlFor="birthDate" type="date" handleChange={handleChange} label={t("create_customer.birth_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
						<InputCreateModal value={customerToEdit.personalInfoDTO.dni} editable={editable} htmlFor="dni" type="text" handleChange={handleChange} label={t("create_customer.dni")} />
						<InputCreateModal value={customerToEdit.personalInfoDTO.email} editable={editable} htmlFor="email" type="email" handleChange={handleChange} label={t("create_customer.email")} containerClassName="w-full flex flex-col gap-1 col-span-2" />
						<InputCreateModal value={customerToEdit.personalInfoDTO.address.city} editable={editable} htmlFor="city" type="text" handleChange={handleChange} label={t("create_customer.city")} />
						<InputCreateModal value={customerToEdit.personalInfoDTO.address.street} editable={editable} htmlFor="street" type="text" handleChange={handleChange} label={t("create_customer.street")} />
						<InputCreateModal value={customerToEdit.personalInfoDTO.address.postalCode} editable={editable} htmlFor="postalCode" type="text" handleChange={handleChange} label={t("create_customer.postal_code")} />
						<InputCreateModal value={customerToEdit.personalInfoDTO.phoneNumber} editable={editable} htmlFor="phoneNumber" type="text" handleChange={handleChange} label={t("create_customer.phone_number")} />
					</div>
					<div className="col-span-1 col-start-2 gap-2 mb-20 grid grid-cols-2">
						<div className="col-span-2">
							<label htmlFor="sport" className="text-primary-10 font-bold ml-5">{t('create_customer.sport')}</label>
							<select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="sport" onChange={handleChange} disabled={!selectedComplex || editable}>
								{activities.length === 0 ? (<option value={customerToEdit.sport} selected>{customerToEdit.sport}</option>) : (<option value="" disabled>{customerToEdit.sport}</option>)}
								{activities.map((activityName) => (<option key={activityName} value={activityName}>{activityName}</option>))}
							</select>
						</div>
						<div className="col-span-2">
							<label htmlFor="membershipType" className="text-primary-10 font-bold ml-5">{t('create_customer.membership')}</label>
							<select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="membershipType" onChange={handleChange} disabled={!selectedComplex || editable}>
								{activities.length === 0 ? (<option value={customerToEdit.membershipDTO.membershipType} selected>{customerToEdit.membershipDTO.membershipType}</option>) : (<option value="" disabled>{customerToEdit.membershipDTO.membershipType}</option>)}
								{MEMBERSHIP.map((category) => (
									<option key={category} value={category}>{category}</option>
								))}
							</select>
						</div>
						<div className="col-span-2">
							<label htmlFor="paymentMethod" className="text-primary-10 font-bold ml-5">{t('create_customer.payment_method')}</label>
							<select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="paymentMethod" onChange={handleChange} disabled={!selectedComplex || editable}>
								<option value="" selected disabled>{t("create_customer.payment_method")}</option>
								{PAYMENT_METHODS.map((category) => (
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
					<div className="col-span-2 mt-4 flex gap-10 justify-center absolute bottom-0 right-5">
						<button onClick={handleEdit} className="bg-secondary-0 hover:bg-secondary-10 border border-secondary-30 rounded-full shadow-md text-xl shadow-secondary-10 text-white px-16 py-2 active:shadow-none disabled:bg-gray-400 disabled:shadow-none disabled:text-black" type="button" disabled={editable}>{t("complex_detail.save")}</button>
						<button className="bg-secondary-0 hover:bg-secondary-10 border border-secondary-30 rounded-full shadow-md text-xl shadow-secondary-10 text-white px-16 py-2 active:shadow-none disabled:bg-gray-400 disabled:shadow-none disabled:text-black" type="submit" disabled={!editable}>{t("complex_detail.edit_confirm")}</button>
					</div>
					<button onClick={handleDelete} className="bg-secondarydark-40 absolute left-10 bottom-0 border-secondary-30 border rounded-full shadow-md text-xl shadow-secondary-10 text-white px-6 py-2 active:shadow-none" type="button">Dar de baja</button>
				</form>
			</div >
		</Modal >
	);
};

export default CustomerDetail;


