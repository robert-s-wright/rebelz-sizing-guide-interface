import React, { useState, useEffect } from "react";

import { TextField, Button, Link, Alert, Collapse, Card } from "@mui/material";

import styles from "./Login.module.css";

import { loginUser } from "../requests";

import Header from "./Header";

import { motion } from "framer-motion";

import { animation } from "./motion";

const Login = React.forwardRef(
  (
    { user, setUser, blankUser, navigate, setIsAuthenticated, ...rest },
    ref
  ) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleLogin = async () => {
      const output = await loginUser(user);

      if (output.status === 200) {
        setIsAuthenticated(true);
        setUser(output.data);

        navigate("dashboard");
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
          <form
            {...rest}
            className={styles.container}
            ref={ref}
          >
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
            <Link
              underline="hover"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/admin")}
            >
              Login to administration panel
            </Link>
            <Collapse in={showAlert}>
              <Alert severity="warning">{alert}</Alert>
            </Collapse>
          </form>
        </Card>
      </motion.div>
    );
  }
);

export default Login;
