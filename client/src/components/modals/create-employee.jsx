import { useTranslation } from "react-i18next";
import Icon from "../accesories/icon";
import Modal from "./modal";
import { useState } from "react";
import axios from "axios";
import Select from "../accesories/select";
import InputCreateModal from "../accesories/input-create-modal";
import { EMPLOYEES_DATA, STAFF_CATEGORIES } from "../../lib/const";

function CreateEmployee({ handleCreateModal, handleRefresh }) {
  const [errors, setErrors] = useState([]);
  const [employee, setEmployee] = useState({});

  const { t } = useTranslation();

  const handleChange = (e) => {
    if (e.target.name === EMPLOYEES_DATA.STAFF) {
      setEmployee({ ...employee, staff: e.target.value });
    } else if (e.target.name === EMPLOYEES_DATA.SALARY) {
      setEmployee({ ...employee, salary: e.target.value });
    } else if (e.target.name === EMPLOYEES_DATA.FIRST_NAME) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, firstName: e.target.value } });
    } else if (e.target.name === EMPLOYEES_DATA.LAST_NAME) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, lastName: e.target.value } });
    } else if (e.target.name === EMPLOYEES_DATA.EMAIL) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, email: e.target.value } });
    } else if (e.target.name === EMPLOYEES_DATA.DNI) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, dni: e.target.value } });
    } else if (e.target.name === EMPLOYEES_DATA.BIRTH_DATE) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, birthDate: e.target.value } });
    } else if (e.target.name === EMPLOYEES_DATA.PHONE_NUMBER) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, phoneNumber: e.target.value } });
    } else if (e.target.name === EMPLOYEES_DATA.CITY) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, address: { ...employee.personalInfo.address, city: e.target.value } } });
    } else if (e.target.name === EMPLOYEES_DATA.POSTAL_CODE) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, address: { ...employee.personalInfo.address, postalCode: e.target.value } } });
    } else if (e.target.name === EMPLOYEES_DATA.STREET) {
      setEmployee({ ...employee, personalInfo: { ...employee.personalInfo, address: { ...employee.personalInfo.address, street: e.target.value } } });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      ...employee,
      status: true
    }
    console.log("nuevo empleado", newEmployee);
    try {
      const { data } = await axios.post("/api/v1/employees/create", newEmployee, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`,
          "Content-Type": "Application/json"
        }
      });

      console.log(data);
      if (data) {
        handleRefresh();
        handleCreateModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal>
      <div className="relative flex bg-gradient-to-b from-primary-80 via-20% via-white  to-secondary-80  w-[1100px] min-h-[450px] rounded-xl drop-shadow-2xl shadow-2xl shadow-black/60 flex-col p-10 items-center text-primary-0" onClick={(e) => e.stopPropagation()} >
        <button className="absolute top-4 right-4" onClick={handleCreateModal}><Icon iconName="x" /></button>
        <h2 className="text-center text-2xl mb-10">{t("create_employee.title")}</h2>
        <form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-x-20 relative px-16">
          <div className="flex flex-col gap-10 items-center">
            <div className="h-40 w-40 rounded-xl overflow-hidden border-primary-0 border-2">
              <img className="w-full h-full aspect-square object-cover" src="/image/ImagePlaceHolder.png" alt="imagen por defeceto del complejo" />
            </div>
            <InputCreateModal htmlFor="startDate" type="date" handleChange={handleChange} label={t("create_employee.start_date")} inputClassName="px-6 py-2 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
            <Select htmlFor="staff" handleChange={handleChange} label={t("create_employee.select_staff")} options={STAFF_CATEGORIES} />
          </div>
          <div className="col-span-1 col-start-2 gap-4 mb-32 grid grid-cols-2 ">
            <InputCreateModal htmlFor="first_name" type="text" handleChange={handleChange} label={t("create_employee.first_name")} />
            <InputCreateModal htmlFor="last_name" type="text" handleChange={handleChange} label={t("create_employee.last_name")} />
            <InputCreateModal htmlFor="email" type="email" handleChange={handleChange} label={t("create_employee.email")} />
            <InputCreateModal htmlFor="birth_date" type="date" handleChange={handleChange} label={t("create_employee.birth_date")} inputClassName="px-6 py-2 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
            <InputCreateModal htmlFor="dni" type="text" handleChange={handleChange} label={t("create_employee.dni")} />
            <InputCreateModal htmlFor="street" type="text" handleChange={handleChange} label={t("create_employee.street")} />
            <InputCreateModal htmlFor="postal_code" type="text" handleChange={handleChange} label={t("create_employee.postal_code")} />
            <InputCreateModal htmlFor="city" type="text" handleChange={handleChange} label={t("create_employee.city")} />
            <InputCreateModal htmlFor="phone_number" type="text" handleChange={handleChange} label={t("create_employee.phone_number")} />
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