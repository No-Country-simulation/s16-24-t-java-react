import React, { useState } from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ClassIcon from "@mui/icons-material/Class";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HelpIcon from "@mui/icons-material/Help";
import { styled, useTheme } from "@mui/material/styles";
import CreateUser from "../modals/createUser.jsx"; // Ajusta la ruta según la estructura de tu proyecto

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

function SideBar() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [showCreateUserModal, setShowCreateUserModal] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleNewMember = () => {
		setOpen(false); // Cerrar la barra lateral si está abierta
		setShowCreateUserModal(true);
	};

	const handleOutsideClick = (event) => {
		if (open && event.target.closest(".MuiDrawer-root") === null) {
			setOpen(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [open]);

	return (
		<Box sx={{ display: "flex" }}>
			<Drawer variant="permanent" open={open}>
				<div
					className="bg-gray-800 text-white h-screen"
					style={{ width: drawerWidth }}
				>
					<div className="py-6 px-2">
						<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								edge="start"
								sx={{
									marginRight: 5,
									display: open ? "none" : "inherit",
								}}
							>
								<MenuIcon />
							</IconButton>
							<IconButton
								onClick={handleDrawerClose}
								sx={{
									display: open ? "inherit" : "none",
								}}
							>
								{theme.direction === "rtl" ? (
									<ChevronRightIcon />
								) : (
									<ChevronLeftIcon />
								)}
							</IconButton>
						</Box>
						<List>
							{/* Lista de elementos que se mantienen */}
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary="Inicio" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<GroupIcon />
								</ListItemIcon>
								<ListItemText primary="Empleados" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<ClassIcon />
								</ListItemIcon>
								<ListItemText primary="Clases" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<BusinessCenterIcon />
								</ListItemIcon>
								<ListItemText primary="Mi Centro" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<HelpIcon />
								</ListItemIcon>
								<ListItemText primary="Soporte" />
							</ListItem>
						</List>
						<div className="flex justify-center mt-40">
							<img
								src="src/assets/OIG21.jpeg"
								alt="Logo de la empresa"
								className="h-20 rounded-full mt-4"
							/>
						</div>
					</div>
				</div>
			</Drawer>

			{showCreateUserModal && (
				<CreateUser handleNewMember={() => setShowCreateUserModal(false)} />
			)}
		</Box>
	);
}

export default Sidebar;
