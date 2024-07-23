


function TableRow({ setUserID, handleProfileModal, data }) {
  const handleClick = () => {
    setUserID(data.dni)
    handleProfileModal()
  }


  return (
    <tr onClick={handleClick} className="text-center even:bg-tertiary-0 odd:bg-tertiary-20 [&>td]:py-4 [&>td]:border-b [&>td]:border-primary-0">
      {Object.keys(data).map((key, index) => (
        <td key={key} className={`custom-td ${index === 0 ? 'first:border-l' : ''} ${index === Object.keys(data).length - 1 ? 'last:border-r' : ''}`}>
            {data[key]}
        </td>
      ))}
    </tr>
  )
}

export default TableRow

