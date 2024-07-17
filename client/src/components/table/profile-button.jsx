import { useState } from "react"
import Icon from "../accesories/icon"
import ProfileMenu from "./profile-menu"

function ProfileButton({handleLogOut}) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }
  return (
    <div className="relative">
      <button onClick={handleClick} className="bg-primary-0 text-secondary-0 p-2 rounded-full">
        <Icon iconName="profile" />
      </button>
      {isClicked && <ProfileMenu handleClick={handleClick} handleLogOut={handleLogOut}/>}
    </div>
  )
}

export default ProfileButton