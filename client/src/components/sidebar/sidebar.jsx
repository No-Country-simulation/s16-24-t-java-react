import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { GrFormAdd } from "react-icons/gr";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { IoStorefront } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { BiDollar } from "react-icons/bi";

const Gap = ({ className }) => {
	return (
		<div className={className} ></div>
	)
}

const SidebarButtonContainer = ({ name, children }) => {
	return (
		<div>
			<p className={"text-black font-bold text-sm truncate transition-[opacity] opacity-0 group-hover:opacity-100"}>{name}</p>
			<Gap className={"w-full h-[6px]"} />
			<div>{children}</div>
		</div>
	)
}
const SidebarButton = ({ children, selected, name, icon }) => {

	const [opened, setOpened] = useState(false)
	const [hovered, setHovered] = useState(false)

	const onClick = () => {
		if (!children) {
			// Aca va la logica del boton normal

		} else { // Si es un boton que despliega mas botones:
			setOpened(!opened)
		}
	}

	const hoverFunct = (bool) => {
		setHovered(bool)
	}
	return (
		<div className="h-auto transition-[height]">
			<button className="relative w-full h-[50px] bg-transparent transition-[height] group-boton" onClick={onClick} onMouseEnter={() => hoverFunct(true)} onMouseLeave={() => hoverFunct(false)}>
				<div className={"absolute w-full h-full bg-primary-20/80 rounded-lg z-[-0.1] transition-[opacity] " + ((selected == true || hovered == true) ? "opacity-40" : "opacity-0")} />
				<div className="relative flex items-center content-center flex-row h-full w-[200px]">
					{icon ? <Gap className={"w-[12px] h-full"} /> : undefined}
					{children ? <IoIosArrowForward className={"w-0 h-4 opacity-0 transition-[width,transform] group-hover:opacity-100 group-hover:w-4" + " " + (opened == true ? "transform rotate-90" : "transform rotate-0") + " " + (selected == true || hovered == true ? "fill-primary-20" : "fill-black")} /> : null}
					{children ? <Gap className={"w-0 h-full opacity-0 transition-[width] group-hover:opacity-100 group-hover:w-[12px]"} /> : null}
					{icon ? < icon.f iconName={icon.t} selected={(selected == true || hovered == true)} /> : undefined}
					<Gap className={"w-[14px] h-full"} />
					<p className={"w-auto h-full left-[72px] flex items-center font-medium truncate opacity-0 group-hover:opacity-100 " + ((selected == true || hovered == true) ? "text-primary-20" : "text-[#172554]")}>{name}</p>
				</div>
			</button>
			{opened == true ? <div className="pl-0 group-hover:pl-4 transition-[padding]">
				{children}
			</div> : undefined}
		</div>
	)
}

const Separator = () => {
	return (
		<div className="w-full h-px"></div>
	)
}

const IconType = ({ iconName, selected }) => { // Perdonen por este lio, mas tarde lo arreglo :(
	const className = "w-6 h-full left-[36px]" + " " + (selected == true ? "fill-primary-20" : "fill-black")
	if (iconName == "store") {
		return <IoStorefront className={className} />
	} else if (iconName == "add") {
		return <GrFormAdd className={className} />
	} else if (iconName == "edit") {
		return <MdModeEdit className={className} />
	} else if (iconName == "trash") {
		return <IoMdTrash className={className} />
	} else if (iconName == "search") {
		return <IoSearchSharp className={className} />
	} else if (iconName == "employes") {
		return <IoPeople className={className} />
	} else if (iconName == "analytics") {
		return <SiGoogleanalytics className={className} />
	} else if (iconName == "cash") {
		return <BiDollar className={className} />
	}
	return <div></div>
}

function Sidebar() { // TODO: Traducciones
	return (
		<div className="bg-gray-100 shadow-lg h-screen w-[82px] py-2 px-4 rounded-r-2xl gap-6 flex flex-col fixed overflow-y-auto scrollbar-thumb-primary-20 scrollbar-none hover:w-64 transition-[width] group">
			<Separator />
			<SidebarButtonContainer name={"ADMINISTRACION"}>
				<SidebarButton name={"Sucursales"} icon={{ f: IconType, t: "store" }} />
				<SidebarButton name={"Empleados"} selected={false} icon={{ f: IconType, t: "employes" }} />
				<SidebarButton name={"Metricas"} selected={false} icon={{ f: IconType, t: "analytics" }} >
					<SidebarButton name={"Dinero"} selected={false} icon={{ f: IconType, t: "cash" }} />
					<SidebarButton name={"Boton01"} selected={false} icon={{ f: IconType, t: "add" }} />
					<SidebarButton name={"Boton02"} selected={false} icon={{ f: IconType, t: "edit" }} />
					<SidebarButton name={"Boton03"} selected={false} icon={{ f: IconType, t: "trash" }} />
				</SidebarButton>
			</SidebarButtonContainer>
			<SidebarButtonContainer name={"NOSE QUE PONER"}>
				<SidebarButton name={"Sucursales"} icon={{ f: IconType, t: "store" }} />
				<SidebarButton name={"Empleados"} selected={false} icon={{ f: IconType, t: "employes" }} />
			</SidebarButtonContainer>
		</div>
	);
}

export default Sidebar;
