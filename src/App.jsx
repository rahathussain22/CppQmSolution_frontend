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
              </Route>

              <Route path="/quality-procedures">
                <Route path="wps-management" element={<WPS />} />
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
