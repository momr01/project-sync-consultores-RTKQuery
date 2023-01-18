import {
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const USER = "USER";
  const ROL = "ROL";
  const ID = "ID";

  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem(USER) ?? false
  );
  const [admin, setAdmin] = useState(window.localStorage.getItem(ROL) ?? false);
  const [id, setId] = useState(window.localStorage.getItem(ID) ?? "");

  const login = useCallback(function (newRol, id) {
    window.localStorage.setItem(USER, true);
    setIsAuthenticated(true);
    window.localStorage.setItem(ID, id);
    setId(id);
    if (newRol === "admin") {
      window.localStorage.setItem(ROL, true);
      setAdmin(true);
    }
    toast.success(`Login OK`, {
      style: {
        borderRadius: "10px",
        fontSize: "1.3rem",
        background: "#CCF6B6",
        color: "#000",
      },
    });
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(USER);
    setIsAuthenticated(false);
    window.localStorage.removeItem(ROL);
    setAdmin(false);
    window.localStorage.removeItem(ID);
    setId("");
  }, []);

  //usememo porque no quiero crear este objeto cada vez, sino memorizar el valor y que solo cambie cuando
  //alguna de las dependencias cambie
  const value = useMemo(
    () => ({
      login,
      logout,
      admin,
      isAuthenticated,
      id,
    }),
    [login, logout, admin, isAuthenticated, id]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContext.Provider.propTypes = {
  children: PropTypes.object,
};

export function useAuth() {
  return useContext(AuthContext);
}
