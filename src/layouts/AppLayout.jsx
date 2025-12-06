import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const AppLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  // Also optionally check user if desired
  if (!accessToken) return <Navigate to="/login" replace />;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
