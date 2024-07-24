import { useTranslation } from "react-i18next";
import Icon from "../accesories/icon";
import Modal from "./modal";
import { useContext, useState } from "react";
import axios from "axios";
import { ComplexContext } from "../../contexts/complex-context";

function CreateComplex({ handleCreateModal }) {
  const [title, setTitle] = useState("");
  const [cuit, setCuit] = useState("");
  const [apertureDate, setApertureDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [errors, setErrors] = useState([]);

  const { t } = useTranslation();
  const { handleRefresh } = useContext(ComplexContext);

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "cuit") {
      setCuit(e.target.value);
    } else if (e.target.name === "aperture_date") {
      setApertureDate(e.target.value);
    } else if (e.target.name === "phone_number") {
      setPhoneNumber(e.target.value);
    } else if (e.target.name === "city") {
      setCity(e.target.value);
    } else if (e.target.name === "postal_code") {
      setPostalCode(e.target.value);
    } else if (e.target.name === "street") {
      setStreet(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComplex = {
      title,
      cuit,
      apertureDate,
      phoneNumber,
      address: {
        city,
        postalCode,
        street
      }
    }

    try {
      const { data } = await axios.post("/api/v1/complexes/create", newComplex, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`,
          "Content-Type": "Application/json"
        }
      });
      if(data) {
        handleRefresh();
        handleCreateModal();
      }
    } catch (error) {
      console.log(error);
    }
    
    console.log(newComplex);
  }

  return (
    <Modal>
      <div className="relative flex bg-gray-100 w-[800px] min-h-[450px] rounded-xl shadow-2xl flex-col p-10  items-center text-primary-0" onClick={(e) => e.stopPropagation()} >
        <button className="absolute top-4 right-4" onClick={handleCreateModal}><Icon iconName="x" /></button>
        <h2 className="text-center text-2xl mb-10">{t("createComplex.title")}</h2>
        <form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-4 [&>div>label]:font-bold">
          <div className="w-full grid grid-cols-2 col-span-2 gap-10 ">
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="title">{t("createComplex.title")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="title" placeholder={t("createComplex.activity")} />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 col-span-2 gap-10 ">
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="cuit">{t("createComplex.cuit")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="cuit" placeholder={t("createComplex.activity")} />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 col-span-2 gap-10 ">
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="aperture_date">{t("createComplex.aperture_date")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="aperture_date" placeholder={t("createComplex.activity")} />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 col-span-2 gap-10 ">
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="phone_number">{t("createComplex.phone_number")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="phone_number" placeholder={t("createComplex.activity")} />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 col-span-2 gap-10 ">
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="city">{t("createComplex.city")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="city" placeholder={t("createComplex.activity")} />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 col-span-2 gap-10 ">
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="postal_code">{t("createComplex.postal_code")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="postal_code" placeholder={t("createComplex.activity")} />
            </div>
          </div><div className="w-full grid grid-cols-2 col-span-2 gap-10 ">
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="street">{t("createComplex.street")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="street" placeholder={t("createComplex.activity")} />
            </div>
          </div>

          <div className="col-span-2 flex flex-col justify-center">
            {errors.length > 0 && errors.map((error, index) => (
              <p className="text-red-500 text-center" key={index}>{`*${t(`createComplex.${error.path[0]}`)} ${t(`createComplex.errors.${error.code}`)?.toLowerCase()}`}</p>
            ))}
          </div>
          <div className="col-span-2 mt-4 flex justify-center">
            <button className="bg-primary-0 text-secondary-0 px-6 py-2 " type="submit">{t("select.add")}</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateComplex