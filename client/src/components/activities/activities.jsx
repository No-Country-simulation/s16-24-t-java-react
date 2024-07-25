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

	},[selectedComplex]);

  const handleSelectComplex = (event) => {
    const complexToSelect = complexes.find((complex) => complex.cuit === event.target.value);
    setSelectedComplex(complexToSelect);
  }

	const handleAddModal = () => {
		setShowAddActivityModal(!showAddActivityModal);
	};

	return (
		<section className="h-full w-full">
      <label className="mr-10" htmlFor="complex">Sleccionar sede:</label>
      <select name="complex" id="" onChange={handleSelectComplex}>
        <option className="text-center" value="" selected>sedes</option>
        {complexes.map((complex) => <option key={complex.cuit} value={complex.cuit}>{complex.title}</option>)}
      </select>
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
                const activity = selectedComplex.activities?.find(
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
      {showAddActivityModal && <AddActivity handleAddModal={handleAddModal} cuit={selectedComplex.cuit}/>}
    </section>
	);
}

export default Calendar;
