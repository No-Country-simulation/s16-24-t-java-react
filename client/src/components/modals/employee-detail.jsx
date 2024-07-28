import { useTranslation } from "react-i18next";
import Icon from "../accesories/icon";
import Modal from "./modal";
import { useEffect, useState } from "react";
import axios from "axios";
import InputCreateModal from "../accesories/input-create-modal";
import { EMPLOYEES_DATA } from "../../lib/const";
import { EmployeeScheme } from "../../lib/zod-schemas";

function EmployeeDetail({ handleEditModal, handleRefresh, employeeToEdit }) {
  const [errors, setErrors] = useState([]);
  const [employee, setEmployee] = useState({});
  const [editable, setEditable] = useState(true);

  const { t } = useTranslation();
 
  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [employeeToEdit]);

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

  const handleEdit = () => {
    setEditable(!editable);
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
        const response = await axios.put("/api/v1/employees/update", data, {
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
  }

  return (
    <Modal>
      <div className="relative flex bg-gradient-to-b from-primary-80 via-20% via-white  to-secondary-80  w-[1100px] min-h-[450px] rounded-xl drop-shadow-2xl shadow-2xl shadow-black/60 flex-col p-10 items-center text-primary-0" onClick={(e) => e.stopPropagation()} >
      <div className="absolute top-4 right-4 flex gap-4">
          <button className={`${editable ? "" : "hidden"}`} onClick={handleEdit}><Icon iconName="pencil" /></button>
          <button className="" onClick={handleEditModal}><Icon iconName="x" /></button>
        </div>
        <h2 className="text-center text-3xl font-bold mb-10">{t("employee_detail.title")}</h2>
        <form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-x-10 relative px-10">
          <div className="flex flex-col gap-10 items-center">
            <div className="h-40 w-40 rounded-xl overflow-hidden border-primary-0 border-2">
              <img className="w-full h-full aspect-square object-cover" src="/image/ImagePlaceHolder.png" alt="imagen por defeceto del complejo" />
            </div>
            <InputCreateModal editable={true} value={employee?.personalInfo?.startDate} htmlFor="startDate" type="date" handleChange={handleChange} label={t("employee_detail.start_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
            <p className="text-3xl text-primary-10 uppercase">{t(`employee_detail.${employee?.staff}`)}</p>
          </div>
          <div className="col-span-1 col-start-2 gap-2 mb-20 grid grid-cols-2 ">
            <InputCreateModal editable={editable} value={employee?.personalInfo?.firstName} htmlFor="firstName" type="text" handleChange={handleChange} label={t("employee_detail.first_name")} />
            <InputCreateModal editable={editable} value={employee?.personalInfo?.lastName} htmlFor="lastName" type="text" handleChange={handleChange} label={t("employee_detail.last_name")} />
            <InputCreateModal editable={editable} value={employee?.personalInfo?.birthDate} htmlFor="birthDate" type="date" handleChange={handleChange} label={t("employee_detail.birth_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
            <InputCreateModal editable={editable} value={employee?.personalInfo?.dni} htmlFor="dni" type="text" handleChange={handleChange} label={t("employee_detail.dni")} />
            <InputCreateModal editable={editable} value={employee?.personalInfo?.email} htmlFor="email" type="email" handleChange={handleChange} label={t("employee_detail.email")} containerClassName="w-full flex flex-col gap-1 col-span-2" />
            <InputCreateModal editable={editable} value={employee?.personalInfo?.address?.street} htmlFor="street" type="text" handleChange={handleChange} label={t("employee_detail.street")} />
            <InputCreateModal editable={editable} value={employee?.personalInfo?.address?.postalCode} htmlFor="postalCode" type="text" handleChange={handleChange} label={t("employee_detail.postal_code")} />
            <InputCreateModal editable={editable} value={employee?.personalInfo?.address?.city} htmlFor="city" type="text" handleChange={handleChange} label={t("employee_detail.city")} />
            <InputCreateModal editable={editable} value={employee?.personalInfo?.phoneNumber} htmlFor="phoneNumber" type="text" handleChange={handleChange} label={t("employee_detail.phone_number")} />
            <InputCreateModal editable={editable} value={employee?.salary} htmlFor="salary" type="number" handleChange={handleChange} label={t("employee_detail.salary")} />
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            {errors.length > 0 && errors.map((error, index) => (
              <p className="text-red-500 text-center" key={index}>{`*${t(`create_employee.${error.path[0]}`)} ${t(`create_employee.errors.${error.code}`)?.toLowerCase()}`}</p>
            ))}
          </div>
          <div className="col-span-2 mt-4 flex gap-10 justify-center absolute bottom-0 right-5">
            <button onClick={handleEdit} className="bg-secondary-0 border border-secondary-30 rounded-full shadow-md text-xl shadow-secondary-10 text-white px-16 py-2 active:shadow-none disabled:bg-gray-400 disabled:shadow-none disabled:text-black" type="button" disabled={editable}>{t("create_complex.save")}</button>
            <button className="bg-secondary-0 border border-secondary-30 rounded-full shadow-md text-xl shadow-secondary-10 text-white px-16 py-2 active:shadow-none disabled:bg-gray-400 disabled:shadow-none disabled:text-black" type="submit" disabled={!editable}>{t("employee_detail.edit_confirm")}</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EmployeeDetail