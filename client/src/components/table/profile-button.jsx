import { useState } from "react";
import Icon from "../accesories/icon";
import ProfileMenu from "./profile-menu";

function ProfileButton({ handleLogOut }) {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};
	return (
		<div className="right-[1px] flex">
			{isClicked == true ? (
				<div
					className="absolute left-0 top-0 w-screen h-screen"
					onClick={(e) => {
						e.stopPropagation();
						handleClick();
					}}
				/>
			) : undefined}
			<button
				onClick={handleClick}
				className="bg-primary-70 p-3 border-tertiary-0 rounded-full text-primary-0 z-0"
			>
				<Icon iconName="profile" />
			</button>
			{isClicked && (
				<div className="relative w-full h-full top-0 z-0">
					<ProfileMenu handleClick={handleClick} handleLogOut={handleLogOut} />
				</div>
			)}
		</div>
	);
}

export default ProfileButton;
