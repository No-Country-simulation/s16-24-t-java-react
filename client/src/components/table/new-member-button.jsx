import Icon from "../accesories/icon"

function NewMemberButton({handleNewMember}) {
  return (
    <button onClick={handleNewMember} className="bg-primary-0 text-secondary-0 px-2 py-1">
      <Icon iconName="addUser"/>
    </button>
  )
}

export default NewMemberButton