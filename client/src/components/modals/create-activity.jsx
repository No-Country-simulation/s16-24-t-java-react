import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Icon from "../accesories/icon";
import Modal from "./modal";
import Select from "../accesories/select";

import { ActivitiySchema } from "../../lib/zod-schemas";
import { capitalize } from "../../lib/helpers";
import { DaysColumns, Hours } from "../../lib/const";
import { ComplexContext } from "../../contexts/complex-context";

function CreateActivity({ handleAddModal, cuit }) {
  const [bgColor, setBgColor] = useState("#CCF5D1");
  const [activity, setActivity] = useState({});
  const [errors, setErrors] = useState([]);

  const {handleRefresh} = useContext(ComplexContext);
  const { t } = useTranslation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { activityName, startTime, endTime} = activity;
    setErrors([]);
    const newActivity = {
      ...activity,
      gymCuit: cuit,
      activityName: capitalize(activityName),
      color: bgColor
    }
    try {
      if (startTime >= endTime) {
        setErrors([{
          path: ["start_time"],
          code: "invalid_times"
        }])
        return
      }

      const { success, data, error } = ActivitiySchema.safeParse(newActivity);
      if (!success) {
        setErrors(error.issues);
        return
      }
      const response = await axios.post("/api/v1/WorkoutSessions/create", data , {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("sportify_jwt_access")}`,
          "Content-Type": "Application/json"
        }
      });

      if (response.data.statusCode === "201") {
        setErrors([]);
        handleRefresh();
        handleAddModal();
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleBgColor = (e) => {
    setBgColor(e.target.value);
  };

  return (
    <Modal>
      <div className="relative flex bg-gray-100 w-[800px] min-h-[450px] rounded-xl shadow-2xl flex-col p-10  items-center text-primary-0" onClick={(e) => e.stopPropagation()} >
        <button className="absolute top-4 right-4" onClick={handleAddModal}><Icon iconName="x" /></button>
        <h2 className="text-center text-2xl mb-10">{t("select.title")}</h2>
        <form onSubmit={handleSubmit} action="" className="grid grid-cols-2 w-full gap-4 [&>div>label]:font-bold">
          <div className="w-full grid grid-cols-2 col-span-2 gap-10 ">
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="activityName">{t("select.activity_name")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="activityName" placeholder={t("select.activity")} />
              <input className="w-10 h-full" type="color" value={bgColor} onChange={handleBgColor} name="color" />
            </div>

          </div>
          <Select htmlFor={"startTime"} id={"start_time"} label={t("select.start_time")} firstOption={t("select.choose_time")} options={Hours} handleChange={handleChange} />
          <Select htmlFor={"endTime"} id={"end_time"} label={t("select.end_time")} firstOption={t("select.choose_time")} options={Hours} handleChange={handleChange} />
          <Select htmlFor={"dayOfWeek"} id={"day_of_week"} label={t("select.day_of_week")} firstOption={t("select.choose_day")} options={DaysColumns} handleChange={handleChange} optionValue={true} />
          <div className="col-span-2 flex flex-col justify-center">
            {errors.length > 0 && errors.map((error, index) => (
              <p className="text-red-500 text-center" key={index}>{`*${t(`select.${error.path[0]}`)} ${t(`select.errors.${error.code}`)?.toLowerCase()}`}</p>
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

export default CreateActivity