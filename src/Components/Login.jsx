import React, { useState, useEffect } from "react";

import { TextField, Button, Link, Alert, Collapse } from "@mui/material";

import styles from "./Login.module.css";

import { loginUser } from "../requests";

const Login = React.forwardRef((props, ref) => {
  const { user, setUser, setRegistering, setLoggedIn, blankUser, ...rest } =
    props;

  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async () => {
    const output = await loginUser(user);

    if (output.status === 200) {
      setUser(output.data);
      setLoggedIn(true);
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
    <div
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
          onClick={() => handleLogin()}
        >
          Log In
        </Button>
        <Button
          variant="outlined"
          onClick={() => setRegistering(true)}
        >
          Register
        </Button>
      </div>
      <Link
        underline="hover"
        sx={{ cursor: "pointer" }}
      >
        Forgot your username or password?
      </Link>
      <Collapse in={showAlert}>
        <Alert severity="warning">{alert}</Alert>
      </Collapse>
    </div>
  );
});

export default Login;
