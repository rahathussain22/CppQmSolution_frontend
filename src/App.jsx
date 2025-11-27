import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import TestingNavbar from "./components/TestingNavbar";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";

// Layout component to conditionally show Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // Hide Navbar only on login

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {!hideNavbar && <TestingNavbar />}
      {children}
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setIsLoggedIn(true);
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Login route */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <LoginPage onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />

          {/* Home route */}
          <Route
            path="/home"
            element={
              isLoggedIn ? <Home /> : <Navigate to="/login" replace />
            }
          />

          {/* Default route */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
            }
          />

          {/* Catch-all route */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
