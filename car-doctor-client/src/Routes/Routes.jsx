import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CheckOut from "../pages/CheckeOut/CheckOut";
import Booking from "../pages/Bookings/Booking";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        {
          path: "/bookings",
          element: <PrivateRoute><Booking></Booking></PrivateRoute>
        },
        {
          path: "/checkOut/:id",
          element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/servicess/${params.id}`)
        },
      ]
    },
  ]);

  export default router;