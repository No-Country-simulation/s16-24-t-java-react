import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Table from "./components/table/table";
import Calendar from "./components/activities/activities";
import RutaPrueba from "./rutaprueba";
import Support from "./components/technical-support/technical-support";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Table />,
			},
			{
				path: "/staff",
				element: <Table />,
			},
			{
				path: "/activities",
				element: <Calendar />,
			},
			{
				path: "/headquarters",
				element: <Table />,
			},
			{
				path: "/technical-support",
				element: <Support />,
			},
		],
	},
]);
