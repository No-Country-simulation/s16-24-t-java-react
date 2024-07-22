import { useTranslation } from "react-i18next"
import { DaysColumns, Hours } from "../../lib/const"
const Activities = [{
  nombre: "Futbol",
  horario_inicio: "10:00",
  horario_fin: "12:00",
  codigo: "1234",
  dia_de_la_semana: 3,
},
{
  nombre: "Basket",
  horario_inicio: "14:00",
  horario_fin: "15:00",
  codigo: "2413",
  dia_de_la_semana: 2,
},
{
  nombre : "Voleibol",
  horario_inicio: "16:00",
  horario_fin: "18:00",
  codigo: "1234",
  dia_de_la_semana: 5,
}
]



function Calendar() {
  
  const {t} = useTranslation()

  const getHourIndex = (time) => {
    const [hour] = time.split(":").map(Number);
    return hour;
  };

  return (
    <section className="h-full w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-tertiary-0">
            <th>{t('activities.schedule')}</th>
            {DaysColumns.map((day, index) => (
              <th className="py-2"  key={index}>{t(`activities.${day}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Hours.map((hour, rowIndex) => (
            <tr key={rowIndex}>
              <td className="bg-primary-60 text-center py-2">{hour}</td>
              {DaysColumns.map((_, colIndex) => {
                const activity = Activities.find(
                  (activity) =>
                    activity.dia_de_la_semana === colIndex + 1 &&
                    getHourIndex(activity.horario_inicio) <= rowIndex &&
                    getHourIndex(activity.horario_fin) > rowIndex
                );

                return (
                  <td
                    className={`${
                      activity ? "bg-secondary-20" : "bg-gray-100"
                    } py-2 text-center`}
                    key={colIndex}
                  >
                    {activity ? activity.nombre : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Calendar