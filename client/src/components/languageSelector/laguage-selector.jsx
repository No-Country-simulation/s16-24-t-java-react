import { useTranslation } from "react-i18next"

function LanguageSelector({className}) {

  const { i18n } = useTranslation()

  const lngs = {
    "en": { nativeName: "English" },
    "es": { nativeName: "Español" }
  }

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <>
      <select className={className} name="Language" id="laguage-selector" onChange={handleChange}>
        <option className="text-gray-500" disabled defaultValue=""  selected>Seleccionar Lenguaje</option>
        {Object.keys(lngs).map((lng) => <option key={lng} value={lng}>{lngs[lng].nativeName}</option>)}
      </select>
    </>
  )
}

export default LanguageSelector