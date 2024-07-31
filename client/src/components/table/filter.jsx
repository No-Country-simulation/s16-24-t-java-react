import { useTranslation } from "react-i18next"
function Filter({ filters, handleChange, subfilters }) {

  const { t } = useTranslation()

  return (
    <>
      <select className="px-4 py-2 bg-primary-20 text-white rounded-2xl shadow-inner shadow-black" name="filter" id="sport-selector" onChange={handleChange} disabled={subfilters?.length < 1}>
        <option className="text-white/70 " value="all" selected>{t('filter.all')}</option>
        {filters && filters.map((filter) => <option key={filter} value={filter}>{t(`filter.${filter}`)}</option>)}
        {subfilters && subfilters.map((filter) => <option key={filter} value={filter}>{filter}</option>)}
      </select>
    </>
  )
}

export default Filter