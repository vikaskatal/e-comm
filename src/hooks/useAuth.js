import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../redux/authSlice";
import { MyRoutes } from "../constants";

export default function useAuth() {
  const isAuthenticated = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signIn = useCallback((authResp) => {
    dispatch(setIsLogin());
    localStorage.setItem("token", authResp.token);
    // history.push("/catalogue");
  }, []);

  const signOut = useCallback(() => {
    dispatch(setIsLogin());
    localStorage.removeItem("token");
    navigate(MyRoutes.LOGIN);
  }, []);

  return {
    isAuthenticated,
    signIn,
    signOut,
  };
}
