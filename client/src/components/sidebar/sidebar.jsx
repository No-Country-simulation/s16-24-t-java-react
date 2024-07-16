import * as React from "react";
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
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled, useTheme } from "@mui/material/styles";

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
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<Drawer variant="permanent" open={open}>
				<div
					className="bg-gray-800 text-white h-screen"
					style={{ width: drawerWidth }}
				>
					<div className="py-6 px-2">
						<div className="text-lg font-bold mb-8">Menu</div>
						<List>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Alta Clientes" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<MailIcon />
								</ListItemIcon>
								<ListItemText primary="Modificar Cliente" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Baja Cliente" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<MailIcon />
								</ListItemIcon>
								<ListItemText primary="Mi Centro" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Alta Empleado" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<MailIcon />
								</ListItemIcon>
								<ListItemText primary="Modificar Empleado" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Baja Empleado" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<MailIcon />
								</ListItemIcon>
								<ListItemText primary="Alta Sucursal" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Clases y Horarios" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<MailIcon />
								</ListItemIcon>
								<ListItemText primary="Reportes" />
							</ListItem>
							<ListItem button>
								<ListItemIcon sx={{ color: "white" }}>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Soporte" />
							</ListItem>
							{/* Agregar más elementos de lista según sea necesario */}
						</List>
					</div>
				</div>
			</Drawer>
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
		</Box>
	);
}

export default SideBar;
