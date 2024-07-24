import { useState } from "react"
import Icon from "../accesories/icon"
import ProfileMenu from "./profile-menu"

function ProfileButton({isClicked, handleClick, handleLogOut, openLogoutModal, logoutModal, closeLogoutModal}) {

 
  return (
    <div className="relative">
      <button onClick={handleClick} className="bg-primary-70 p-3 border-tertiary-0 rounded-full text-primary-0">
        <Icon iconName="profile" />
      </button>
      {isClicked && <ProfileMenu handleClick={handleClick} handleLogOut={handleLogOut} openLogoutModal={ openLogoutModal } closeLogoutModal={closeLogoutModal} logoutModal={ logoutModal } />}
    </div>
  )
}

export default ProfileButton