import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import Projects from "./pages/Projects";
import Lots from "./pages/Lots";
import Pipelines from "./pages/Pipelines";
import ISODrawings from "./pages/ISODrawings";

function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  return null; // just logs, doesn't render anything
}

function App() {
  return (
    <ReactQueryProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            {/* App (Protected) Routes */}
            <Route element={<AppLayout />}>
              <Route element={<RouteLogger />}>
                <Route path="/home" element={<Home />} />
                <Route path="/dcl/projects" element={<Projects />} />
              </Route>
            </Route>
            {/* Default */}
            {/* <Route path="/" element={<Navigate to={"/home"} />} />
            {/* Catch-all */}
            {/* <Route path="*" element={<Navigate to={"/home"} />} /> */}
          </Routes>
        </MainLayout>
      </Router>
    </ReactQueryProvider>
  );
}

export default App;
