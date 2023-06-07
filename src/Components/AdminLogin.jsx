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

import { loginUser } from "../requests";

import Header from "./Header";

import { motion } from "framer-motion";

import { animation } from "./motion";

import rebelzIcon from "./../Rebelz-R-Logo-1000x1000px_72dpi-32x32.jpg";

const AdminLogin = ({ user, setUser, navigate, blankUser }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async () => {};

  useEffect(() => {
    setUser(blankUser);
  });

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
            onClick={() => navigate("/recovery")}
          >
            Forgot your username or password?
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
