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

    const loginFromRoute = localStorage.getItem('loginFromRoute');
    if(loginFromRoute) {
      navigate(loginFromRoute);
    } else {
      navigate(MyRoutes.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = useCallback(() => {
    dispatch(setIsLogin());
    localStorage.removeItem("token");
    localStorage.removeItem('loginFromRoute');
    navigate(MyRoutes.LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isAuthenticated,
    signIn,
    signOut,
  };
}
