import { useTranslation } from "react-i18next";
import Icon from "../accesories/icon";
import Modal from "./modal";
import { useContext, useState } from "react";
import axios from "axios";
import { ComplexContext } from "../../contexts/complex-context";
import InputCreateModal from "../accesories/input-create-modal";

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
        <h2 className="text-center text-4xl mb-10 font-bold">{t("create_complex.header")}</h2>
        <form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-x-20 relative px-16">
          <div className="flex flex-col gap-10 items-center">
            <div className="h-40 w-40 rounded-xl overflow-hidden border-primary-0 border-2">
              <img className="w-full h-full aspect-square object-cover" src="/image/ImagePlaceHolder.png" alt="imagen por defeceto del complejo" />
            </div>
            <InputCreateModal htmlFor="aperture_date" type="date" handleChange={handleChange} label={t("create_complex.aperture_date")} inputClassName="px-6 py-2 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 custom-date-input" />
          </div>
          <div className="col-span-1 col-start-2 gap-4 mb-32 grid grid-cols-2 ">
            <InputCreateModal htmlFor="title" type="text" handleChange={handleChange} label={t("create_complex.title")} containerClassName="w-full flex flex-col gap-1 col-span-2"/>
            <InputCreateModal htmlFor="cuit" type="text" handleChange={handleChange} label={t("create_complex.SSN")} />
            <InputCreateModal htmlFor="street" type="text" handleChange={handleChange} label={t("create_complex.street")} />
            <InputCreateModal htmlFor="postal_code" type="text" handleChange={handleChange} label={t("create_complex.postal_code")} />
            <InputCreateModal htmlFor="city" type="text" handleChange={handleChange} label={t("create_complex.city")} />
            <InputCreateModal htmlFor="phone_number" type="text" handleChange={handleChange} label={t("create_complex.phone_number")} />
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            {errors.length > 0 && errors.map((error, index) => (
              <p className="text-red-500 text-center" key={index}>{`*${t(`create_complex.${error.path[0]}`)} ${t(`create_complex.errors.${error.code}`)?.toLowerCase()}`}</p>
            ))}
          </div>
          <div className="col-span-2 mt-4 flex justify-center absolute bottom-0 right-5">
            <button className="bg-secondary-0 border border-secondary-30 rounded-full shadow-md text-xl shadow-secondary-10 text-white px-16 py-2 active:shadow-none" type="submit">{t("create_complex.save")}</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateComplex