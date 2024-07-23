import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Table from "./components/table/table";
import Calendar from "./components/activities/activities";
import RutaPrueba from "./rutaprueba";
import UserDetail from "./components/modals/userDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Table />,
        children: [{
          path: "/member/:id",
          element: <UserDetail />
        }]
      },
      {
        path: "/staff",
        element: <Table />,
      },
      {
        path: "/activities",
        element: <Calendar/>
      },
      {
        path: "/headquarters",
        element: <RutaPrueba />
      },
      {
        path: "/technical-support",
        element: <RutaPrueba />
      }
    ],
  }
])