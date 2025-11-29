import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const AppLayout = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
