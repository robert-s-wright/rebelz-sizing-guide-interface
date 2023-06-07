import React, { useEffect, useState } from "react";

import Header from "./Header";

import {
  Button,
  TextField,
  Collapse,
  Alert,
  Typography,
  Card,
} from "@mui/material";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import styles from "./ResetPass.module.css";

import { setNewPassword } from "../requests";

import { animation } from "./motion";

const ResetPass = ({ navigate }) => {
  const { userId, "*": hash } = useParams();

  const [userRecoveryModel, setUserRecoveryModel] = useState({
    userId: parseInt(userId),
    hash,
    password: null,
  });

  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const [alert, setAlert] = useState("testing");
  const [showAlert, setShowAlert] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [passwordConfirmation, setPasswordConfirmation] = useState(true);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleSubmit = async () => {
    if (
      userRecoveryModel.password !== null &&
      confirmedPassword !== null &&
      passwordValidation &&
      passwordConfirmation
    )
      setNewPassword(userRecoveryModel).then((response) => {
        if (response.status === 200) {
          setAlert("Your password has been changed successfully");
          setShowAlert(true);
        } else if (response.status === 400) {
          setError(
            "The session to reset your password has expired or you have entered an invalid url, please send a new request"
          );
          setShowError(true);
        } else {
          setError("Something went wrong, please try again");
          setShowError(true);
        }
      });
    else {
      setError(
        "Please make sure your password is acceptable and that both passwords match"
      );
      setShowError(true);
    }
  };

  const handleConfirmation = () => {
    if (userRecoveryModel.password === confirmedPassword) {
      setPasswordConfirmation(true);
    } else {
      setPasswordConfirmation(false);
    }
  };

  const handleValidation = () => {
    if (userRecoveryModel.password === null) {
      setPasswordValidation(true);
    } else if (
      userRecoveryModel.password !== null &&
      userRecoveryModel.password
        .toLowerCase()
        .match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ) {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
    }
  };

  useEffect(() => {
    handleConfirmation();
    handleValidation();
    setShowAlert(false);
    setShowError(false);
    setTimeout(() => {
      setAlert(null);
      setError(null);
    }, 500);
  }, [confirmedPassword, userRecoveryModel.password]);

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
          <Typography>Enter your new password</Typography>
          <div className={styles.inputFields}>
            <TextField
              label="New Password"
              name="password"
              type="password"
              value={
                userRecoveryModel.password ? userRecoveryModel.password : ""
              }
              sx={{
                ".MuiFormHelperText-root": {
                  textAlign: "center",
                  fontSize: ".7em",
                  lineHeight: "1em",
                },
                flex: "1 1 0px",
              }}
              onChange={(e) => {
                setUserRecoveryModel((state) => ({
                  ...state,
                  password: e.target.value.length === 0 ? null : e.target.value,
                }));
                setShowAlert(false);
              }}
              error={!passwordValidation}
              helperText="Minimum 8 characters containing least 1 letter and 1 number"
            />
            <TextField
              label="Confirm Password"
              name="password"
              type="password"
              value={confirmedPassword ? confirmedPassword : ""}
              sx={{
                ".MuiFormHelperText-root": {
                  textAlign: "center",
                  fontSize: ".7em",
                  lineHeight: "1em",
                },
                flex: "1 1 0px",
              }}
              onChange={(e) => {
                setConfirmedPassword(
                  e.target.value.length === 0 ? null : e.target.value
                );
                setShowAlert(false);
              }}
              error={!passwordConfirmation}
              helperText={
                passwordConfirmation ? null : "Passwords do not match"
              }
            />
          </div>
          <div className={styles.buttons}>
            <Button
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
                return false;
              }}
              type="submit"
            >
              Submit
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
              severity="success"
              sx={{ textAlign: "center" }}
            >
              {alert}
            </Alert>
          </Collapse>
          <Collapse in={showError}>
            <Alert
              severity="warning"
              sx={{ textAlign: "center" }}
            >
              {error}
            </Alert>
          </Collapse>
        </form>
      </Card>
    </motion.div>
  );
};

export default ResetPass;
