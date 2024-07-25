import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import Icon from "../accesories/icon"
import Settings from "../modals/settings"
import LogoutModal from "../modals/logout"

function ProfileMenu({ handleClick, openLogoutModal, logoutModal, closeLogoutModal} ) {
  const [settingsClicked, setSettingsClicked] = useState(false)

  const { t } = useTranslation()
  
  const handleClickSettings = () => {
    setSettingsClicked(!settingsClicked)
  }
console.log(logoutModal)
  return (
    <>
      <div className="absolute top-0 right-0 w-[300px] flex flex-col gap-5 text-white transition-transform translate-x-100 translate-y-100 ease-in-out duration-200 bg-tertiary-0 z-10 rounded-tr-[28px]">
        <div className="flex w-full justify-end gap-6">
          <p className="bg-primary-40 py-2 px-4 text-center flex-1 flex items-center justify-center">Nombre de usuario</p>
          <button onClick={handleClick} className="bg-primary-0 text-secondary-0 rounded-full p-3">
            <Icon iconName="profile" className="" />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <button onClick={handleClickSettings} className="bg-primary-40 py-2 px-4">{t('profileMenu.settings')}</button>
          <button onClick={openLogoutModal} className="bg-primary-40 py-2 px-4">{t('profileMenu.logout')}</button>
        </div>
      </div>
      {settingsClicked && <Settings handleClose={handleClickSettings} />}
      {logoutModal && <LogoutModal closeLogoutModal={closeLogoutModal} />}
    </>


  )
}

export default ProfileMenu