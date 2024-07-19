import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Table from "./components/table/table";

 export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Table/>
      },
      {
        path: "/staff",
        element: <Table/>
      },
      {
        path: "/activities"
      },
      {
        path: "/headquarters"
      },
      {
        path: "/technical-support"
      }
    ],
  }
])