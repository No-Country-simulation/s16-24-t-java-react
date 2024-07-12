import { useTranslation } from "react-i18next"
function Filter ({filters, handleChange}) {  

  const {t} = useTranslation()

  return (
    <>
      <select name="filter" id="sport-selector" onChange={handleChange} disabled={filters.length < 1}>
        <option className="text-gray-500"  value="all" selected>{t('filter.all')}</option>
        {filters && filters.map((filter) => <option key={filter} value={filter}>{t(`filter.${filter}`)}</option>)}
      </select>
    </>
  )
}

export default Filter