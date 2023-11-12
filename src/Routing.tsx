import { createBrowserRouter } from "react-router-dom";
import Dashboard from "Pages/Dashboard";
import About from "Pages/About";
import Error404 from "Pages/Error404";


export const router = createBrowserRouter([
  {
    path : "/dashboard/*",
    element : <Dashboard />
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
