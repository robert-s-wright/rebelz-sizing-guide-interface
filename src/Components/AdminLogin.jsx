import React, { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Link,
  Alert,
  Collapse,
  Card,
  Chip,
  Typography,
  Avatar,
} from "@mui/material";

import styles from "./Login.module.css";

import { loginAdmin } from "../requests";

import Header from "./Header";

import { motion } from "framer-motion";

import { animation } from "./motion";

import rebelzIcon from "./../Rebelz-R-Logo-1000x1000px_72dpi-32x32.jpg";

const AdminLogin = ({
  user,
  setUser,
  navigate,
  blankUser,
  setAdminIsAuthenticated,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async () => {
    const output = await loginAdmin(user);

    console.log(output);

    if (output.status === 200) {
      setAdminIsAuthenticated(true);
      setUser(output.data);

      navigate("admindashboard");
    } else if (output.status === 403) {
      setAlert("You lack rights to access the admin dashboard");
      setShowAlert(true);
    } else if (output.status === 401) {
      setAlert("Invaid username and/or password.");
      setShowAlert(true);
    } else {
      setAlert("An unexpected error occurred, please try again.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    setUser(blankUser);
  }, []);

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
      className={styles.wrapper}
    >
      <Card>
        <Header />
        <form className={styles.container}>
          <Chip
            label="Admin Login"
            avatar={<Avatar src={rebelzIcon} />}
          />
          <div className={styles.inputFields}>
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={user.email ? user.email : ""}
              sx={{
                ".MuiFormHelperText-root": {
                  textAlign: "center",
                  fontSize: ".7em",
                  lineHeight: "1em",
                },
              }}
              onChange={(e) => {
                setUser((state) => ({
                  ...state,
                  email: e.target.value,
                }));

                setShowAlert(false);
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password ? user.password : ""}
              sx={{
                ".MuiFormHelperText-root": {
                  textAlign: "center",
                  fontSize: ".7em",
                  lineHeight: "1em",
                },
              }}
              onChange={(e) => {
                setUser((state) => ({
                  ...state,
                  password: e.target.value,
                }));

                setShowAlert(false);
              }}
            />
          </div>
          <div className={styles.buttons}>
            <Button
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
                return false;
              }}
              type="submit"
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </div>
          <Link
            underline="hover"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Back to User Login
          </Link>
          <Collapse in={showAlert}>
            <Alert severity="warning">{alert}</Alert>
          </Collapse>
        </form>
      </Card>
    </motion.div>
  );
};

export default AdminLogin;
