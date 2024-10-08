import {useTranslation} from 'react-i18next'

function TableHeader({headers}) {
  const {t} = useTranslation()

  return (

    <>
      <thead className="text-center text-base bg-primary-10 text-white sticky top-0 left-0 border-x border-primary-10">
        <tr>
          {headers.map((header) => (
            <th className='py-4 px-6' key={header}>{t(`tableHeader.${header}`)}</th>
          ))}
        </tr>
      </thead>
    </>

  )
}

export default TableHeader