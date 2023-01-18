import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import routes from "../helpers/routes";

export default function PublicRoute() {
  //consumimos el contexto, nos quedamos solo con isAuthenticated
  const { isAuthenticated, admin } = useAuth();

  if (isAuthenticated) {
    if (admin) return <Navigate to={routes.admin} />;
    else return <Navigate to={routes.consultor} />;
  }

  //con outlet se pintara el componente mas cercano, dentro del mismo grupo
  return (
    <div>
      <Outlet />
    </div>
  );
}