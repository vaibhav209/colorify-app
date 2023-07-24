import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import routes from "./routes.json";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path={routes.USERLOGIN} element={<Login />} />
      <Route path={routes.USERHOME} element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default PageRoutes;
