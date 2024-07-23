import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

import Icon from "../accesories/icon"

import { DaysColumns, Hours } from "../../lib/const"
import AddActivity from "../modals/add-activity";
import { getHourIndex } from "../../lib/helpers";

const Activities = [
  {
    activity_name: "Futbol",
    start_time: "10:00",
    end_time: "12:00",
    code: "1234",
    day_of_week: 3,
    color: "#CCF5D1"
  },
  {
    activity_name: "Basket",
    start_time: "14:00",
    end_time: "15:00",
    code: "2413",
    day_of_week: 2,
    coach: "Chubut",
    color: "#CCF5D1"
  },
  {
    activity_name: "Volleyball",
    start_time: "16:00",
    end_time: "18:00",
    code: "1234",
    day_of_week: 5,
    coach: "Cordoba",
    color: "#CCF5D1"
  },
];



function Calendar() {
  const [activities, setActivities] = useState(Activities);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);


  const { t } = useTranslation()

  useEffect((

  ) => { }, [activities]);



  const handleAddModal = () => {
    setShowAddActivityModal(!showAddActivityModal);
  };

  return (
    <section className="h-full w-full">
      <table className="w-full border-2 border-primary-0">
        <thead >
          <tr className="bg-primary-0 text-white">
            <th className=" text-center relative"> <button onClick={handleAddModal} className="absolute top-0 left-0 bg-primary-30 text-white text-primary-0 p-3 mr-5"><Icon iconName="plus" width={24}/></button>{t('activities.schedule')} </th>
            {DaysColumns.map((day, index) => (
              <th className="py-3 w-[calc(100%/8)]" key={index}>{t(`activities.${day}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Hours.map((hour, rowIndex) => (
            <tr key={rowIndex}>
              <td className="bg-tertiary-10 font-semibold text-center py-2">{hour}</td>
              {DaysColumns.map((_, colIndex) => {
                const activity = activities.find(
                  (activity) =>
                    activity.day_of_week === colIndex + 1 &&
                    getHourIndex(activity.start_time) <= rowIndex &&
                    getHourIndex(activity.end_time) > rowIndex
                );

                return (
                  <td
                  style={{ backgroundColor: activity ? activity.color : "transparent" }}
                    className= "py-2 text-center"
                    key={colIndex}
                  >
                    {activity ? activity.activity_name : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {showAddActivityModal && <AddActivity handleAddModal={handleAddModal} setActivities={setActivities} activities={activities} />}
    </section>
  )
}

export default Calendar