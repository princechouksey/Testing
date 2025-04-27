import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import AdminLogin from "../pages/AdminLogin";
import RegisterComplaint from "../pages/RegisterComplaint";
import ComplaintForm from "../pages/ComplaintForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ComplaintForm/>,
      }


      // {
      //   path: "",
      //   element: <Home />,
      // },
      // {
      //   path: "/register",
      //   element: <div>Register</div>,
      // },
      // {
      //   path: "/user/login",
      //   element: <UserLogin />  ,
      // },
      // {
      //   path: "/register/user",
      //   element: <UserRegister />,
      // },
      // {
      //   path: "/admin/login",
      //   element: <AdminLogin />,
      // },
      // {
      //   path: "/register/complaint",
      //   element: <RegisterComplaint />
      // }
    ],
  },
]);


export default router;
