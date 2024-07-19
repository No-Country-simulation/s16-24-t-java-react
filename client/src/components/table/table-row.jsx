

function TableRow({ setUserID, handleProfileModal, user }) {
  const handleClick = () => {
    setUserID(user.dni)
    handleProfileModal()
  }
  return (
    <tr onClick={handleClick} className="text-center [&>td]:py-4 [&>td]:border-b [&>td]:border-primary-0">
      {Object.keys(user).map((key, index) => (
        <td key={key} className={`custom-td ${index === 0 ? 'first:border-l' : ''} ${index === Object.keys(user).length - 1 ? 'last:border-r' : ''}`}>
            {user[key]}
        </td>
      ))}
    </tr>
  )
}

export default TableRow

