import { useTranslation } from "react-i18next"
import Icon from "../accesories/icon"
import Modal from "./modal.jsx"
import NotificationRow from "./notification-row"
import LanguageSelector from "../languageSelector/laguage-selector"

function Settings({ handleClose }) {

  const { t } = useTranslation()
  
  return (
    <Modal closeCallback={handleClose}>
      <div className="relative flex bg-gray-100 w-[900px] h-[650px] rounded-[32px] shadow-2xl flex-col p-10 gap-10" onClick={(e) => e.stopPropagation()} >
        <div className="flex flex-col gap-4 justify-center items-start">
          <p className="text-primary-10 font-bold text-xl px-4 py-1 bg-tertiary-20 rounded-lg">{t("settings.profile_title")}</p>
          <div className="flex border-primary-40 border-2 px-2 py-1 rounded-lg bg-secondary-50 text-primary-10 ">
            <label className="hidden" htmlFor="full_name"></label>
            <input className="w-full bg-transparent focus:outline-none px-2 text-lg font-semibold" type="text" name="full_name" value='nombre completo'/>
            <button>
              <Icon iconName="pencil" width='24' />
            </button>
          </div>
          <div className="flex border-primary-40 border-2 px-2 py-1 rounded-lg bg-secondary-50 text-primary-10 ">
            <label className="hidden" htmlFor="email"></label>
            <input className="w-full bg-transparent focus:outline-none px-2 text-lg font-semibold" type="email" name="email" value='email'/>
            <button>
              <Icon iconName="pencil" width='24' />
            </button>
          </div>
        </div>
        <div className="flex gap-20 ">
          <div className="flex-1 flex items-start flex-col gap-4">
            <p className="text-primary-10 font-bold text-xl px-4 py-1 bg-tertiary-20 rounded-lg">{t("settings.notifications_title")}</p>
            <div className="grid grid-cols-4 w-full place-content-center place-items-center justify-items-center items justify-center gap-2">
              <Icon className='col-span-1 col-start-3' iconName='deskptop' />
              <Icon iconName='mail_notifications' />
              <NotificationRow toTranslate="settings.new_report" />
              <NotificationRow toTranslate="settings.withdrawal" />
              <NotificationRow toTranslate="settings.income" />
              <NotificationRow toTranslate="settings.new_member" />
              <NotificationRow toTranslate="settings.save_changes" />
            </div>
          </div>
          <div className=" flex flex-col items-start gap-4 px-5">
            <p className="text-primary-10 font-bold text-xl px-4 py-1 bg-tertiary-20 rounded-lg">{t("settings.system_title")}</p>
            <div className="grid grid-cols-4 w-full place-content-center place-items-center justify-items-center items justify-center gap-2">
              <div className="col-span-3 h-8"></div>
              <NotificationRow toTranslate="settings.dark_theme" notDouble />
              <NotificationRow toTranslate="settings.light_theme" notDouble />
            </div>
            <div className="col-span-4 flex gap-3">
              <label className="col-span-1  w-full text-center text-secondary-0 font-bold px-4 py-1 bg-primary-20 rounded-lg" htmlFor="">{t("settings.language")}:</label>
              <LanguageSelector className={"col-span-3"} />
            </div>
          </div>
        </div>
        <div className="flex gap-10 justify-end pt-5 mr-5">
          <button onClick={handleClose} className="text-tertiary-20 font-bold text-xl px-4 py-1 bg-red-400 rounded-lg">{t("settings.cancel")}</button>
          <button className="text-tertiary-20 font-bold text-xl px-4 py-1 bg-primary-0 rounded-lg">{t("settings.save")}</button>
        </div>
      </div>
    </Modal>
  )
}

export default Settings