import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComplexContext } from "../../contexts/complex-context";

import Icon from "../accesories/icon";
import AddActivity from "../modals/add-activity";
import { getHourIndex } from "../../lib/helpers";
import { DaysColumns, Hours } from "../../lib/const";

function Calendar() {
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [selectedComplex, setSelectedComplex] = useState([]);

  const { t } = useTranslation();

  const { complexes } = useContext(ComplexContext);

  useEffect(() => {
    console.log("complex", selectedComplex.activities);

  }, [selectedComplex]);

  const handleSelectComplex = (event) => {
    const complexToSelect = complexes.find((complex) => complex.cuit === event.target.value);
    setSelectedComplex(complexToSelect);
  }

  const handleAddModal = () => {
    setShowAddActivityModal(!showAddActivityModal);
  };

  return (
    <section className="h-full w-full relative">
      <table className="w-full  border border-primary-0">
        <thead>
          <tr className="bg-primary-0 ">
            <th className=" text-center relative">
              <select className="w-full py-3  text-white bg-primary-30 outline-none border-collapse appearance-none h-full" name="complex" id="" onChange={handleSelectComplex}>
                <option className="text-center bg-primary-10" value="" selected>Seleccionar sede</option>
                {complexes.map((complex) => <option className="bg-primary-10" key={complex.cuit} value={complex.cuit}>{complex.title}</option>)}
              </select>
            </th>
            {DaysColumns.map((day, index) => (
              <th className="py-3 w-[calc(100%/8)] relative text-white" key={index}>{t(`activities.${day}`)}{index === DaysColumns.length
                - 1 && <button onClick={handleAddModal} className="absolute h-full self-center top-0 right-0 bg-primary-30 text-white text-primary-0 p-3 "><Icon iconName="plus" width={24} /></button>}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Hours.map((hour, rowIndex) => (
            <tr key={rowIndex}>
              <td className="bg-tertiary-10 font-semibold text-center py-2">{hour}</td>
              {DaysColumns.map((_, colIndex) => {
                const activity = selectedComplex.activities?.find(
                  (activity) =>
                    activity.day_of_week === colIndex + 1 &&
                    getHourIndex(activity.start_time) <= rowIndex &&
                    getHourIndex(activity.end_time) > rowIndex
                );

                return (
                  <td
                    style={{ backgroundColor: activity ? activity.color : "transparent" }}
                    className="py-2 text-center"
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
      {showAddActivityModal && <AddActivity handleAddModal={handleAddModal} cuit={selectedComplex.cuit} />}
    </section>
  );
}

export default Calendar;
