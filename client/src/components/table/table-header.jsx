import {useTranslation} from 'react-i18next'

function TableHeader({headers}) {
  const {t} = useTranslation()

  return (

    <>
      <thead className="text-center text-base bg-primary-10 text-white sticky top-0 left-0 border-x border-primary-10">
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