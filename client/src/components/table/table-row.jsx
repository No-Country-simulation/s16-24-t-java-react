import { useEffect, useState } from "react"
import { PATHS } from "../../lib/const"

function TableRow({ setID, pathname, handleEditModal, data }) {
  const [info, setInfo] = useState(data)
  const handleClick = () => {
    const ID = pathname === PATHS.HEADQUARTERS ? data.cuit : data.dni
    setID(ID)
    handleEditModal()
  }

  useEffect(() => {
    if (pathname === PATHS.HOME) {
      const { status, ...rest } = data
      setInfo(rest)
    } else {
      setInfo(data)
    }
  }, [pathname, data])

  const handleStatus = () => {
    if (pathname === PATHS.HEADQUARTERS) {
      return true
    }
    return data.status === "active" ? true : false
  }

  return (
    <tr onClick={handleClick} className={`text-center ${handleStatus() ? `even:bg-tertiary-0 odd:bg-tertiary-40 hover:even:bg-secondary-70 odd:hover:bg-secondary-80` : `odd:bg-gray-100 even:bg-gray-200 hover:even:bg-gray-400 hover:odd:bg-gray-300 text-gray-700 hover:none`} [&>td]:py-4 [&>td]:border-b [&>td]:border-primary-0 cursor-pointer  `}>
      {Object.keys(info).map((key) => (
        <td key={key} className="first:border-l last:border-r ">
          {data[key]}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
