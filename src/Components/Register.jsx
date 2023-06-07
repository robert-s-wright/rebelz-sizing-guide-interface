import React, { useEffect, useState } from "react";

import { TextField, Button, Link, Alert, Collapse, Card } from "@mui/material";

import styles from "./Register.module.css";

import { registerUser } from "../requests";

import Header from "./Header";

import { motion } from "framer-motion";

import { animation } from "./motion";

const Register = React.forwardRef((props, ref) => {
  const { setUser, user, blankUser, navigate, ...rest } = props;

  const blankValidation = {
    email: false,
    password: false,
    attemptedRegister: false,
  };

  const [validation, setValidation] = useState(blankValidation);
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleValidation = (value, field) => {
    setShowAlert(false);
    if (field === "email") {
      if (
        value
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setValidation((state) => ({ ...state, [field]: true }));
      } else {
        setValidation((state) => ({ ...state, [field]: false }));
      }
    } else if (field === "password") {
      if (value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
        setValidation((state) => ({ ...state, [field]: true }));
      } else {
        setValidation((state) => ({ ...state, [field]: false }));
      }
    }
  };

  const handleRegistration = async () => {
    setValidation((state) => ({ ...state, attemptedRegister: true }));

    if (validation.email && validation.password) {
      const output = await registerUser(user);

      if (output.status === 200) {
        setUser(blankUser);
        setAlert(null);
        setSuccess("Sucessfully added, please proceed to the login page.");
        setShowSuccess(true);
        setValidation((state) => ({ ...state, attemptedRegister: false }));
      } else if (output.status === 409) {
        setAlert(
          "That e-mail is already associated with an account, please log in."
        );
        setShowAlert(true);
      } else {
        setAlert("Something went wrong, please try again.");
        setShowAlert(true);
      }
    } else return;
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
              error={validation.attemptedRegister && !validation.email}
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
                handleValidation(e.target.value, "email");
              }}
              helperText={
                validation.attemptedRegister && !validation.email
                  ? "Please enter a valid email"
                  : null
              }
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password ? user.password : ""}
              error={validation.attemptedRegister && !validation.password}
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
                handleValidation(e.target.value, "password");
              }}
              helperText="Minimum 8 characters containing least 1 letter and 1 number"
            />
          </div>
          <div className={styles.buttons}>
            <Button
              variant="outlined"
              onClick={() => handleRegistration()}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </div>
          <Collapse in={showAlert}>
            <Alert
              severity="warning"
              sx={{ margin: "10px" }}
            >
              {alert}
            </Alert>
          </Collapse>

          <Collapse in={showSuccess}>
            <Alert
              severity="success"
              sx={{ margin: "10px" }}
            >
              {success}
            </Alert>
          </Collapse>
        </div>
      </Card>
    </motion.div>
  );
});

export default Register;
