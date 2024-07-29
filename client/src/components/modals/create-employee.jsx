import { useTranslation } from "react-i18next";
import Icon from "../accesories/icon";
import Modal from "./modal";
import { useState } from "react";
import axios from "axios";
import InputCreateModal from "../accesories/input-create-modal";
import { EMPLOYEES_DATA, STAFF_CATEGORIES } from "../../lib/const";
import { EmployeeScheme } from "../../lib/zod-schemas";

function CreateEmployee({ handleCreateModal, handleRefresh }) {
  const [errors, setErrors] = useState([]);
  const [employee, setEmployee] = useState({});

  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === EMPLOYEES_DATA.city || name === EMPLOYEES_DATA.postalCode || name === EMPLOYEES_DATA.street) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, address: { ...employee.personalInfo.address, [name]: value } } });
    } else if (name === EMPLOYEES_DATA.staff || name === EMPLOYEES_DATA.salary) {
      setEmployee({ ...employee, [name]: value });
    } else {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, [name]: value } });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      ...employee,
      status: true
    }

    const { success, data, error } = EmployeeScheme.safeParse(newEmployee);
    if (error) {
      setErrors(error.issues);
      return
    }
    try {
      if (success) {
        const response = await axios.post("/api/v1/employees/create", data, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`,
            "Content-Type": "Application/json"
          }
        });
        if (response.data) {
          handleRefresh();
          handleCreateModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal>
      <div className="relative flex bg-gradient-to-b from-primary-80 via-20% via-white  to-secondary-80  w-[1100px] min-h-[450px] rounded-xl drop-shadow-2xl shadow-2xl shadow-black/60 flex-col p-10 items-center text-primary-0" onClick={(e) => e.stopPropagation()} >
        <button className="absolute top-4 right-4" onClick={handleCreateModal}><Icon iconName="x" /></button>
        <h2 className="text-center text-3xl font-bold mb-10">{t("create_employee.title")}</h2>
        <form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-x-10 relative px-10">
          <div className="flex flex-col gap-10 items-center">
            <div className="h-40 w-40 rounded-xl overflow-hidden border-primary-0 border-2">
              <img className="w-full h-full aspect-square object-cover" src="/image/ImagePlaceHolder.png" alt="imagen por defeceto del complejo" />
            </div>
            <InputCreateModal htmlFor="startDate" type="date" handleChange={handleChange} label={t("create_employee.start_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
            <select className="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner w-full shadow-black border-2 border-primary-50" name="staff" onChange={handleChange}>
              <option value="">{t("create_employee.select_staff")}</option>
              {STAFF_CATEGORIES.map((category) => (
                <option key={category} value={category}>{t(`create_employee.${category}`)}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 col-start-2 gap-2 mb-20 grid grid-cols-2 ">
            <InputCreateModal htmlFor="firstName" type="text" handleChange={handleChange} label={t("create_employee.first_name")} />
            <InputCreateModal htmlFor="lastName" type="text" handleChange={handleChange} label={t("create_employee.last_name")} />
            <InputCreateModal htmlFor="birthDate" type="date" handleChange={handleChange} label={t("create_employee.birth_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
            <InputCreateModal htmlFor="dni" type="text" handleChange={handleChange} label={t("create_employee.dni")} />
            <InputCreateModal htmlFor="email" type="email" handleChange={handleChange} label={t("create_employee.email")} containerClassName="w-full flex flex-col gap-1 col-span-2" />
            <InputCreateModal htmlFor="street" type="text" handleChange={handleChange} label={t("create_employee.street")} />
            <InputCreateModal htmlFor="postalCode" type="text" handleChange={handleChange} label={t("create_employee.postal_code")} />
            <InputCreateModal htmlFor="city" type="text" handleChange={handleChange} label={t("create_employee.city")} />
            <InputCreateModal htmlFor="phoneNumber" type="text" handleChange={handleChange} label={t("create_employee.phone_number")} />
            <InputCreateModal htmlFor="salary" type="number" handleChange={handleChange} label={t("create_employee.salary")} />
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
      </div>
    </Modal>
  )
}

export default CreateEmployee