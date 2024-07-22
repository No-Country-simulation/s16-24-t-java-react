import { useTranslation } from "react-i18next";

function Select({ htmlFor, id, label, firstOption, options, handleChange, optionValue }) {

  const { t } = useTranslation();

  return (
    <div className="grid w-full col-span-2 grid-cols-2 gap-10">
      <label className="col-span-1 place-content-center text-center bg-secondary-40" htmlFor={htmlFor}>{label}</label>
      <select className="px-4 py-2 bg-primary-80 text-primary-0 col-span-1" onChange={handleChange} name={htmlFor} id={id}>
        <option className="focus:text-gray-500" value="" selected>{firstOption}</option>
        {options.map((opt, index) => {
          return (<option key={opt} value={optionValue ? index + 1 : opt} >
            {opt.endsWith("00") ? opt : t(`select.${opt}`)}
          </option>)
        }
        )}
      </select>
    </div >)
}

export default Select
