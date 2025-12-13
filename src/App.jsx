import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import Projects from "./pages/dcl/Projects";
import ISODrawings from "./pages/engineering-design/ISODrawings";
import WPS from "./pages/quality-procedures/WPS";
import Welder from "./pages/quality-procedures/Welder";
import Joints from "./pages/engineering-design/Joints";
import Components from "./pages/materials-documents/Components";

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
              <Route path="/home" element={<Home />} />
              <Route path="/dcl/projects" element={<Projects />} />

              <Route path="/engineering-design">
                <Route path="iso-drawings" element={<ISODrawings />} />
                <Route path="joints" element={<Joints />} />
              </Route>

              <Route path="/quality-procedures">
                <Route path="wps-management" element={<WPS />} />
                <Route path="welder-management" element={<Welder />} />
              </Route>

              <Route path="/materials-documents">
                <Route path="components" element={<Components />} />
              </Route>
            </Route>
            {/* Default */}
            <Route path="/" element={<Navigate to={"/home"} />} />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </MainLayout>
      </Router>
    </ReactQueryProvider>
  );
}

export default App;
