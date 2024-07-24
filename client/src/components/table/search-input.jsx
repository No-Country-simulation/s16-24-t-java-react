import { useOutletContext } from "react-router-dom";
import Icon from "../accesories/icon";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../lib/const";

function SearchInput({ handleSearch }) {

  const pathname = useOutletContext();
  const { t } = useTranslation()

  return (
    <div className="flex border-primary-30 border-2 px-2  rounded-lg bg-primary-20 text-primary-10 items-center text-white shadow-inner shadow-black">
      <label htmlFor="search"><Icon iconName="magnifyingGlass" width="24" /></label>
      <input className="w-full bg-transparent focus:outline-none px-2 placeholder:text-white/80  font-semibold" type="text" id="search" name="search" onChange={handleSearch} placeholder={t(`search.${pathname === PATHS.HEADQUARTERS ? 'cuit' : 'dni'}`)} />
    </div>
  )
}

export default SearchInput