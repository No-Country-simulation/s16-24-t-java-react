import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
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
import Logo from "../../../public/image/Logo.png";

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

	const { t } = useTranslation();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleOutsideClick = (event) => {
		if (open && event.target.closest(".MuiDrawer-root") === null) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [open]);

	return (
		<Box sx={{ display: "flex" }}>
			<Drawer variant="permanent" open={open}>
				<div
					className="bg-primary-0 text-white h-dvh overflow-hidden"
					style={{ width: drawerWidth }}
				>
					<div className="py-2 px-1 flex flex-col pt-24">
						<Box component="main" sx={{ flexGrow: 1, p: -1 }}>
							<ListItem
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
							</ListItem>
							<ListItem
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
							</ListItem>
						</Box>
						<List>
							{/* Lista de elementos que se mantienen */}
							<Link to="/">
								<ListItem button>
									<ListItemIcon sx={{ color: "white" }}>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary={t("sidebar.home")} />
								</ListItem>
							</Link>
							<Link to="/staff">
								<ListItem button>
									<ListItemIcon sx={{ color: "white" }}>
										<GroupIcon />
									</ListItemIcon>
									<ListItemText primary={t("sidebar.staff")} />
								</ListItem>
							</Link>
							<Link to="/activities">
								<ListItem button>
									<ListItemIcon sx={{ color: "white" }}>
										<ClassIcon />
									</ListItemIcon>
									<ListItemText primary={t("sidebar.activities")} />
								</ListItem>
							</Link>
							<Link to="/headquarters">
								<ListItem button>
									<ListItemIcon sx={{ color: "white" }}>
										<BusinessCenterIcon />
									</ListItemIcon>
									<ListItemText primary={t("sidebar.headquarters")} />
								</ListItem>
							</Link>
							<Link to="/technical-support">
								<ListItem button>
									<ListItemIcon sx={{ color: "white" }}>
										<HelpIcon />
									</ListItemIcon>
									<ListItemText primary={t("sidebar.technicalSupport")} />
								</ListItem>
							</Link>
						</List>
						<div
							className={`mt-40 h-44 mx-auto rounded-full p-5 bg-gradient-to-br from-primary-70 via-40% via-white to-secondary-70  transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
						>
							<img
								src={Logo}
								alt="Logo de la empresa"
								className="object-contain w-full h-full"
							/>
						</div>
					</div>
				</div>
			</Drawer>
		</Box>
	);
}

export default SideBar;
