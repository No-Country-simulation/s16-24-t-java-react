import {useTranslation} from 'react-i18next'

function TableHeader() {
  const {t} = useTranslation()

  return (

    <>
      <thead className="text-center text-base bg-primary-0 text-secondary-0 sticky top-0 left-0">
        <tr className='[&>th]:py-4 [&>th]:px-6'>
          <th>{t('tableHeader.full_name')}</th>
          <th>{t('tableHeader.birth_date')}</th>
          <th>{t('tableHeader.id')}</th>
          <th>{t('tableHeader.sport')}</th>
          <th>{t('tableHeader.subscription')}</th>
          <th>{t('tableHeader.payment')}</th>
          <th>{t('tableHeader.due_date')}</th>
          <th>{t('tableHeader.days_from_due')}</th>
          <th>{t('tableHeader.created_at')}</th>
        </tr>
      </thead>
    </>

  )
}

export default TableHeader