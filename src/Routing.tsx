import { createBrowserRouter } from "react-router-dom";
import Dashboard from "Pages/Dashboard";
import About from "Pages/About";
import Error404 from "Pages/Error404";

// const objs = [
//   "/category/*",
//   "/program/edit/:programId",
//   "/program",
//   "/bouquet/edit/:bouquetId",
//   "/bouquet",
//   "/dashboard/*",
// ].map((path) => {
//   return {
//     path,
//     element: <Dashboard />,
//   };
// });

export const router = createBrowserRouter([
  // ...objs,
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
