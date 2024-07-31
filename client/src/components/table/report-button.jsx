import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import Icon from "../accesories/icon"
import { PATHS } from "../../lib/const"

function ReportButton({data, pathname}) {
  const [newData, setNewData] = useState([])

  useEffect(() => {
    if(data) {
      setNewData(data)
    }
  }, [data])

  const handleClick = () => {
    const dataToTransform = newData.map((data) => {
      if(pathname === PATHS.HEADQUARTERS) {
        const { title, ...rest} = data
        return {
          ...rest,
          name: title
        }
      } else if (pathname === PATHS.HOME) {
        return {
         fullname: `${data.personalInfoDTO.firstName} ${data.personalInfoDTO.lastName}`, 
         email: data.personalInfoDTO.email,
         phoneNumber: data.personalInfoDTO.phoneNumber,
         address: `${data.personalInfoDTO.address.city}, ${data.personalInfoDTO.address.postalCode}, ${data.personalInfoDTO.address.street}`,
         dni: data.personalInfoDTO.dni,
         birthDate: data.personalInfoDTO.birthDate,
         membershipType: data.membershipDTO.membershipType,
         endDate: data.membershipDTO.endDate,
         status: data.status ? "active" : "inactive",
         activity: data.sport,
        }
      } else {
        return {
          staff: data.staff,
          salary: data.salary,
          status: data.status ? "active" : "inactive",
          fullName: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          email: data.personalInfo.email,
          phoneNumber: data.personalInfo.phoneNumber,
          address: `${data.personalInfo.address.city}, ${data.personalInfo.address.postalCode}, ${data.personalInfo.address.street}`,
          dni: data.personalInfo.dni,
          birthDate: data.personalInfo.birthDate,
          startDate: data.personalInfo.startDate
        }
      }
    })
    console.log(dataToTransform);
    jsonToExcel(dataToTransform)
  }

  const jsonToExcel = (data) => {
    if (!data || data.length === 0) {
      console.error("No data available to generate the report.");
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
      XLSX.writeFile(workbook, "Reporte.xlsx");

      const wbout = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
      const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'Reporte.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating Excel file:", error);
    }
  }

  return (
    <button onClick={handleClick} className="bg-primary-20 text-white py-1 flex items-center rounded-full gap-4 px-4 shadow-sm shadow-white hover:bg-primary-30 active:shadow-none">
      <Icon iconName="downloadFile"/> Generar reporte
    </button>
  )
}

export default ReportButton

