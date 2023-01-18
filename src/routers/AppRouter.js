import { Routes, Route } from "react-router-dom";
import routes from "../helpers/routes";

//pages
import {
  Login,
  Admin,
  Consultor,
  NotFound,
  ManageEditCons,
  ConsultorEditData,
} from "../pages";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => (
  <Routes>
    <Route path={routes.home} element={<PublicRoute />}>
      <Route index element={<Login />}></Route>
    </Route>

    <Route path={routes.admin} element={<PrivateRoute />}>
      <Route index element={<Admin />}></Route>
      <Route
        path={routes.adminEditOther()}
        element={<ManageEditCons />}
      ></Route>
      <Route
        path={routes.adminEditOwn()}
        element={<ConsultorEditData />}
      ></Route>
    </Route>

    <Route path={routes.consultor} element={<PrivateRoute />}>
      <Route index element={<Consultor />}></Route>
      <Route
        path={routes.consultorEditOwn()}
        element={<ConsultorEditData />}
      ></Route>
    </Route>

    <Route path="*" element={<NotFound />}></Route>
  </Routes>
);

export default AppRouter;
