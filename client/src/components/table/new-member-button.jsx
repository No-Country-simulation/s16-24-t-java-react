import Icon from "../accesories/icon"

function NewMemberButton({handleNewMember}) {
  return (
    <button onClick={handleNewMember} className="bg-primary-20 text-white py-1 flex items-center rounded-lg gap-4 px-4 shadow-sm shadow-white hover:bg-primary-30 active:shadow-none">
      <Icon iconName="addUser"/> Nuevo usuario
    </button>
  )
}

export default NewMemberButton