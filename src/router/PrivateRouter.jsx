import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  //global stateden user bilgisi aldık
  const user = useSelector((state)=> state.auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
