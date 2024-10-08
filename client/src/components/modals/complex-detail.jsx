import { useTranslation } from "react-i18next";
import Icon from "../accesories/icon";
import Modal from "./modal";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ComplexContext } from "../../contexts/complex-context";
import InputCreateModal from "../accesories/input-create-modal";
import { COMPLEX_DATA } from "../../lib/const";
import { ComplexSchema } from "../../lib/zod-schemas";

function ComplexDetail({ handleEditModal, complexToEdit }) {
  const [errors, setErrors] = useState([]);
  const [complex, setComplex] = useState({});
  const [editable, setEditable] = useState(true);

  const { t } = useTranslation();
  const { handleRefresh } = useContext(ComplexContext);

  useEffect(() => {
    const [city, postalCode, street] = complexToEdit.address.split(",");
    const parsedComplex = {
      ...complexToEdit,
      address: {
        city: city.trim(),
        postalCode: postalCode.trim(),
        street: street.trim()
      }
    }
    if (complexToEdit) {
      setComplex(parsedComplex);
    }
    setEditable(true);
  }, [])

  const handleEdit = () => {
    setEditable(!editable);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === COMPLEX_DATA.city || name === COMPLEX_DATA.postalCode || name === COMPLEX_DATA.street) {
      setComplex({ ...complex, address: { ...complex.address, [name]: value } });
    } else {
      setComplex({ ...complex, [name]: value });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, data, error } = ComplexSchema.safeParse(complex);
    if (error) {
      setErrors(error.issues);
      return
    }

    try {
      if (success) {
        const response = await axios.put("/api/v1/complexes/update", data, {
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
        <h2 className="text-center text-3xl mb-10 font-bold">{t("complex_detail.title")}</h2>
        <form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-x-20 relative px-16">
          <div className="flex flex-col gap-10 items-center">
            <div className="h-40 w-40 rounded-xl overflow-hidden border-primary-0 border-2">
              <img className="w-full h-full aspect-square object-cover" src="/image/ImagePlaceHolder.png" alt="imagen por defeceto del complejo" />
            </div>
            <InputCreateModal editable={true} value={complex?.apertureDate} htmlFor="apertureDate" type="date" handleChange={handleChange} label={t("complex_detail.aperture_date")} inputClassName="px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
          </div>
          <div className="col-span-1 col-start-2 gap-4 mb-32 grid grid-cols-2 ">
            <InputCreateModal editable={editable} value={complex?.title} htmlFor="title" type="text" handleChange={handleChange} label={t("complex_detail.title")} containerClassName="w-full flex flex-col gap-1 col-span-2" />
            <InputCreateModal editable={editable} value={complex?.cuit} htmlFor="cuit" type="text" handleChange={handleChange} label={t("complex_detail.SSN")} />
            <InputCreateModal editable={editable} value={complex?.address?.street} htmlFor="street" type="text" handleChange={handleChange} label={t("complex_detail.street")} />
            <InputCreateModal editable={editable} value={complex?.address?.postalCode} htmlFor="postalCode" type="text" handleChange={handleChange} label={t("complex_detail.postal_code")} />
            <InputCreateModal editable={editable} value={complex?.address?.city} htmlFor="city" type="text" handleChange={handleChange} label={t("complex_detail.city")} />
            <InputCreateModal editable={editable} value={complex?.phoneNumber} htmlFor="phoneNumber" type="text" handleChange={handleChange} label={t("complex_detail.phone_number")} />
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            {errors.length > 0 && errors.map((error, index) => (
              <p className="text-red-500 text-center" key={index}>{`*${t(`create_complex.${error.path[0]}`)} ${t(`create_complex.errors.${error.code}`)?.toLowerCase()}`}</p>
            ))}
          </div>
          <div className="col-span-2 mt-4 flex gap-10 justify-center absolute bottom-0 right-5">
            <button onClick={handleEdit} className="bg-secondary-0 hover:bg-secondary-10 border border-secondary-30 rounded-full shadow-md text-xl shadow-secondary-10 text-white px-16 py-2 active:shadow-none disabled:bg-gray-400 disabled:shadow-none disabled:text-black" type="button" disabled={editable}>{t("complex_detail.save")}</button>
            <button className="bg-secondary-0 hover:bg-secondary-10 border border-secondary-30 rounded-full shadow-md text-xl shadow-secondary-10 text-white px-16 py-2 active:shadow-none disabled:bg-gray-400 disabled:shadow-none disabled:text-black" type="submit" disabled={!editable}>{t("complex_detail.edit_confirm")}</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ComplexDetail