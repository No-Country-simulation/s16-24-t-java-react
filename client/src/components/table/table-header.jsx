import {useTranslation} from 'react-i18next'

function TableHeader({headers}) {
  const {t} = useTranslation()

  return (

    <>
      <thead className="text-center text-base bg-primary-0 text-secondary-0 sticky top-0 left-0">
        <tr className='[&>th]:py-4 [&>th]:px-6'>
          {headers.map((header) => (
            <th key={header}>{t(`tableHeader.${header}`)}</th>
          ))}
        </tr>
      </thead>
    </>

  )
}

export default TableHeader