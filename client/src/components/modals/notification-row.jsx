import { useTranslation } from 'react-i18next'

function NotificationRow({toTranslate, notDouble}) {

  const { t } = useTranslation()

  return (
    <>
      <p className={`col-span-2 w-full text-center text-secondary-0 font-bold px-4 py-1 bg-primary-20 rounded-lg`}>
        {t(toTranslate)}
      </p>
      <input type="checkbox" />
      {notDouble ? null : <input type="checkbox" />}
    </>
  )
}

export default NotificationRow