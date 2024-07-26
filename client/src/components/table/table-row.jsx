import { PATHS } from "../../lib/const"

function TableRow({ setID, pathname, handleEditModal, data }) {
  const handleClick = () => {
    const ID = pathname === PATHS.HEADQUARTERS ? data.cuit : data.dni
    setID(ID)
    handleEditModal()
  }

  return (
    <tr onClick={handleClick} className="text-center even:bg-tertiary-0 odd:bg-tertiary-40 [&>td]:py-4 [&>td]:border-b [&>td]:border-primary-0 cursor-pointer hover:even:bg-secondary-70 odd:hover:bg-secondary-80">
      {Object.keys(data).map((key) => (
        <td key={key} className="first:border-l last:border-r">
          {data[key]}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
