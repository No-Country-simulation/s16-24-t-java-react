import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

import Icon from "../accesories/icon"

import { DaysColumns, Hours } from "../../lib/const"
import AddActivity from "../modals/add-activity";
import { getHourIndex } from "../../lib/helpers";

const Activities = [
  {
    name: "Futbol",
    start_time: "10:00",
    end_time: "12:00",
    code: "1234",
    day_of_week: 3,
  },
  {
    name: "Basket",
    start_time: "14:00",
    end_time: "15:00",
    code: "2413",
    day_of_week: 2,
    coach: "Chubut"
  },
  {
    name: "Volleyball",
    start_time: "16:00",
    end_time: "18:00",
    code: "1234",
    day_of_week: 5,
    coach: "Cordoba"
  },
];



function Calendar() {
  const [activities, setActivities] = useState(Activities);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);


  const { t } = useTranslation()

  useEffect((

  ) => {}, [activities]);

  

  const handleAddModal = () => {
    setShowAddActivityModal(!showAddActivityModal);
  };

  return (
    <section className="h-full w-full">

      <div>
        <button onClick={handleAddModal} className="bg-secondary-10 text-primary-0 p-3"><Icon iconName="plus" /></button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-tertiary-0">
            <th>{t('activities.schedule')}</th>
            {DaysColumns.map((day, index) => (
              <th className="py-2" key={index}>{t(`activities.${day}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Hours.map((hour, rowIndex) => (
            <tr key={rowIndex}>
              <td className="bg-primary-60 text-center py-2">{hour}</td>
              {DaysColumns.map((_, colIndex) => {
                const activity = activities.find(
                  (activity) =>
                    activity.day_of_week === colIndex + 1 &&
                    getHourIndex(activity.start_time) <= rowIndex &&
                    getHourIndex(activity.end_time) > rowIndex
                );

                return (
                  <td
                    className={`${activity ? "bg-secondary-20" : "bg-gray-100"
                      } py-2 text-center`}
                    key={colIndex}
                  >
                    {activity ? activity.name : ""}
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