import Icon from "../accesories/icon"

function ReportButton() {
  return (
    <button className="bg-primary-20 text-white py-1 flex items-center rounded-lg gap-4 px-4 shadow-sm shadow-white hover:bg-primary-30 active:shadow-none">
      <Icon iconName="downloadFile"/> Generar reporte
    </button>
  )
}

export default ReportButton