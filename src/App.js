import styles from "./App.module.css";

import { Card, CircularProgress } from "@mui/material";

import { authorize } from "./requests";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import Recovery from "./Components/Recovery";
import ResetPass from "./Components/ResetPass";
import AdminLogin from "./Components/AdminLogin";
import AdminPanel from "./Components/AdminPanel";

import { useState, useEffect } from "react";

import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

function App() {
  const blankUser = {
    id: null,
    email: null,
    name: null,
    password: null,

    userMeasurements: [
      {
        id: null,
        userId: null,
        height: null,
        weight: null,
        arm: null,
        shoulders: null,
        chest: null,
        belly: null,
        waist: null,
        seat: null,
        thigh: null,
      },
    ],
  };

  const [user, setUser] = useState(blankUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminIsAuthenticated, setAdminIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const auth = async () => {
      await authorize().then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
          navigate("dashboard");
          setUser(response.data);
        } else {
          if (location.pathname === "/") {
            navigate("/login");
          } else {
            return;
          }
        }
      });
    };
    auth();
  }, []);

  const props = {
    user,
    blankUser,
    setUser,
    navigate,
    setIsAuthenticated,
    isAuthenticated,
    adminIsAuthenticated,
    setAdminIsAuthenticated,
  };

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path="/"
          element={<CircularProgress />}
        />
        <Route
          path="/login"
          element={<Login {...props} />}
        />
        <Route
          path="/register"
          element={<Register {...props} />}
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard {...props} />
            ) : (
              <Navigate
                replace
                to="/login"
              />
            )
          }
        />

        <Route
          path="/recovery"
          element={<Recovery {...props} />}
        />
        <Route
          exact
          path="/reset/:userId/*"
          element={<ResetPass {...props} />}
        />
        <Route
          path="/admin"
          element={<AdminLogin {...props} />}
        />
        <Route
          path="/admindashboard"
          element={
            adminIsAuthenticated ? (
              <AdminPanel {...props} />
            ) : (
              <Navigate
                replace
                to="/admin"
              />
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
