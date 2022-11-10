import React from "react";
import { Navigate } from "react-router-dom";

const Login = React.lazy(() => import("../views/login"));
const Home = React.lazy(() => import("../views/home"));
const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export default routes;
