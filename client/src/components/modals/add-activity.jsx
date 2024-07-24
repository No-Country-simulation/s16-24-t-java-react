import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Icon from "../accesories/icon";
import Modal from "./modal";
import Select from "../accesories/select";

import { ActivitiySchema } from "../../lib/zod-schemas";
import { capitalize } from "../../lib/helpers";
import { DaysColumns, Hours } from "../../lib/const";

function AddActivity({ handleAddModal }) {
  const [activityName, setActivityName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(undefined);
  const [bgColor, setBgColor] = useState("#CCF5D1");
  const [errors, setErrors] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {

  }, [errors]);

  const handleChange = (e) => {
    if (e.target.name === "activity_name") {
      setActivityName(e.target.value);
    } else if (e.target.name === "start_time") {
      setStartTime(e.target.value);
    } else if (e.target.name === "end_time") {
      setEndTime(e.target.value);
    } else if (e.target.name === "day_of_week") {
      setDayOfWeek(Number(e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newActivity = {
      activity_name: capitalize(activityName),
      start_time: startTime,
      end_time: endTime,
      day_of_week: dayOfWeek,
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
      // TODO: Send data
      // const { data } = await axios.post("url", {
      //   data
      // });

      if (data) {
        // TODO: Handle success
        setActivityName("");
        setStartTime("");
        setEndTime("");
        setDayOfWeek("");
        setErrors([]);
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
            <label className="col-span-1 bg-secondary-30 text-center place-content-center" htmlFor="activity_name">{t("select.activity_name")}</label>
            <div className="w-full flex items-center col-span-1">
              <input className="flex-1 px-4 py-2 bg-primary-80 text-primary-0" onChange={handleChange} type="text" name="activity_name" placeholder={t("select.activity")} />
              <input className="w-10 h-full" type="color" value={bgColor} onChange={handleBgColor} name="color" />
            </div>

          </div>
          <Select htmlFor={"start_time"} id={"start_time"} label={t("select.start_time")} firstOption={t("select.choose_time")} options={Hours} handleChange={handleChange} />
          <Select htmlFor={"end_time"} id={"end_time"} label={t("select.end_time")} firstOption={t("select.choose_time")} options={Hours} handleChange={handleChange} />
          <Select htmlFor={"day_of_week"} id={"day_of_week"} label={t("select.day_of_week")} firstOption={t("select.choose_day")} options={DaysColumns} handleChange={handleChange} optionValue={true} />
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

export default AddActivity