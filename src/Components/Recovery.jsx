import React, { useState } from "react";

import Header from "./Header";

import {
  TextField,
  Button,
  Collapse,
  Alert,
  Typography,
  Card,
} from "@mui/material";

import { motion } from "framer-motion";

import { generatePasswordRecovery } from "../requests";

import styles from "./Recovery.module.css";

import { animation } from "./motion";

const Recovery = ({ navigate }) => {
  const [email, setEmail] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async () => {
    await generatePasswordRecovery(email).then((response) => {
      console.log(response);
    });
  };

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
          <Typography>
            Enter your e-mail to change or reset your password
          </Typography>
          <div className={styles.inputFields}>
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={email ? email : ""}
              sx={{
                ".MuiFormHelperText-root": {
                  textAlign: "center",
                  fontSize: ".7em",
                  lineHeight: "1em",
                },
              }}
              onChange={(e) => {
                setEmail(e.target.value.length === 0 ? null : e.target.value);
                setShowAlert(false);
              }}
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
            <Alert severity="success">{alert}</Alert>
          </Collapse>
        </form>
      </Card>
    </motion.div>
  );
};

export default Recovery;
