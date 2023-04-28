import React, { useEffect, useState, useRef } from "react";

import Login from "./Login";
import Register from "./Register";

import { Zoom, Fade, Card, CircularProgress } from "@mui/material";

import styles from "./Body.module.css";
import Dashboard from "./Dashboard";

import { authorize } from "../requests";

const Body = (props) => {
  const { setLoading } = props;
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  // const [loading, setLoading] = useState(false);

  const transitionTimeout = { enter: 500, exit: 200 };

  useEffect(() => {
    const auth = async () => {
      await authorize().then((response) => {
        if (response.status === 200) {
          transitionToDashboard(response);
        } else {
          setLoading(false);
        }
      });
    };
    auth();
  }, []);

  const transitionToDashboard = (response) => {
    setLoading(false);
    setUser(response.data);
    setLoggedIn(true);
  };

  const transitionToLogin = () => {
    setLoading(true);
    setLoggedIn(false);
    setLoading(false);
  };

  const transitionToRegistration = () => {};

  return (
    <div
      className={`${styles.container} ${
        loggedIn ? styles.loggedInView : styles.loggedOutView
      }`}
    >
      <Fade
        in={!loggedIn && !registering}
        mountOnEnter
        unmountOnExit
        timeout={transitionTimeout}
      >
        <Login
          user={user}
          setUser={setUser}
          setRegistering={setRegistering}
          setLoggedIn={setLoggedIn}
          blankUser={blankUser}
        />
      </Fade>

      <Fade
        in={loggedIn}
        unmountOnExit
        timeout={transitionTimeout}
      >
        <Dashboard
          user={user}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
          blankUser={blankUser}
          transitionToLogin={transitionToLogin}
        />
      </Fade>
      <Fade
        in={!loggedIn && registering}
        unmountOnExit
        timeout={transitionTimeout}
      >
        <Register
          user={user}
          setUser={setUser}
          setRegistering={setRegistering}
          blankUser={blankUser}
        />
      </Fade>
    </div>
  );
};

export default Body;
