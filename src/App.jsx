import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
              <Route path="/dcl">
                <Route path="projects" element={<Projects />} />
                <Route path="lots" element={<Lots />} />
                <Route path="pipelines" element={<Pipelines />} />
                <Route path="iso-drawings" element={<ISODrawings />} />
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
