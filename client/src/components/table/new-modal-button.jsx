import { useOutletContext } from "react-router-dom";
import Icon from "../accesories/icon"
import { useTranslation } from "react-i18next";
import { PATHS } from "../../lib/const";

function NewModalButton({ handleCreateModal }) {

  const pathname = useOutletContext();
  const { t } = useTranslation();

  return (
    <button onClick={handleCreateModal} className="bg-primary-20 text-white py-1 flex items-center rounded-full gap-4 px-4 shadow-sm shadow-white hover:bg-primary-30 active:shadow-none">
      <Icon iconName="addUser" /> {t(`new.${pathname === PATHS.HEADQUARTERS ? 'headquarters' : 'member'}`)}
    </button>
  )
}

export default NewModalButton