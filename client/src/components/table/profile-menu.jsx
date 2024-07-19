import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { LoginContext } from "../../contexts/login-context"

import Icon from "../accesories/icon"
import Settings from "../modals/settings"

function ProfileMenu({ handleClick }) {
  const [settingsClicked, setSettingsClicked] = useState(false)
  const { handleLogout } = useContext(LoginContext)

  const { t } = useTranslation()
  
  const handleClickSettings = () => {
    setSettingsClicked(!settingsClicked)
  }


  return (
    <>
      <div className="absolute top-0 right-0 w-[250px] flex flex-col gap-5 text-white transition-transform translate-x-100 translate-y-100 ease-in-out duration-200 bg-tertiary-0 z-10">
        <div className="flex w-full justify-end gap-8">
          <p className="bg-primary-40 py-2 px-4 text-center">Nombre de usuario</p>
          <button onClick={handleClick} className="bg-primary-0 text-secondary-0 rounded-full p-2">
            <Icon iconName="profile" className="" />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <button onClick={handleClickSettings} className="bg-primary-40 py-2 px-4">{t('profileMenu.settings')}</button>
          <button onClick={handleLogout} className="bg-primary-40 py-2 px-4">{t('profileMenu.logout')}</button>
        </div>
      </div>
      {settingsClicked && <Settings handleClose={handleClickSettings} />}
    </>


  )
}

export default ProfileMenu