import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import ISODrawings from "./pages/engineering/ISODrawings";
import WPS from "./pages/welder-wpq/WPS";
import Welder from "./pages/welder-wpq/Welder";
import Joints from "./pages/engineering/Joints";
import Components from "./pages/engineering/Components";
import RFILogs from "./pages/master-data/RFILogs";
import NCRLogs from "./pages/master-data/NCRLogs";
import TQLogs from "./pages/master-data/TQLogs";
import FitUpRequestPage from "./pages/inspection/FitUpRequestPage";
import MasterDatabase from "./pages/master-data/MasterDatabase";
import ManageUsers from "./pages/ManageUsers";
import IRW001 from "./pages/reports/IRW001";
import NDTRequest from "./pages/inspection/NDTRequest";
import IRW002 from "./pages/reports/IRW002";
import IRW003 from "./pages/reports/IRW003";
import IRW004 from "./pages/reports/IRW004";
import IRW005 from "./pages/reports/IRW005";

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
        <Toaster position="bottom-right" richColors />
        <MainLayout>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            {/* App (Protected) Routes */}
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />

              <Route path="/manage-users" element={<ManageUsers />} />

              <Route path="/master-data">
                <Route path="data-logs" element={<MasterDatabase />} />
                <Route path="rfi-logs" element={<RFILogs />} />
                <Route path="ncr-logs" element={<NCRLogs />} />
                <Route path="tq-logs" element={<TQLogs />} />
              </Route>

              <Route path="welder-wpq">
                <Route path="wps" element={<WPS />} />
                <Route path="welder" element={<Welder />} />
              </Route>

              <Route path="/engineering">
                <Route path="iso-drawings" element={<ISODrawings />} />
                <Route path="joints" element={<Joints />} />
                <Route path="components" element={<Components />} />
              </Route>

              <Route path="/inspection">
                <Route path="fitup-request" element={<FitUpRequestPage />} />
                <Route path="ndt-request" element={<NDTRequest />} />
              </Route>

              <Route path="/reports">
                <Route path="ir-cssp-w-001" element={<IRW001 />} />
                <Route path="ir-cssp-w-002" element={<IRW002 />} />
                <Route path="ir-cssp-w-003" element={<IRW003 />} />
                <Route path="ir-cssp-w-004" element={<IRW004 />} />
                <Route path="ir-cssp-w-005" element={<IRW005 />} />
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
