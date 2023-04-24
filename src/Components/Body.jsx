import React, { useEffect, useState, useRef } from "react";

import Login from "./Login";
import Register from "./Register";

import { Zoom, Fade, Card } from "@mui/material";

import { TransitionGroup } from "react-transition-group";

import styles from "./Body.module.css";
import Dashboard from "./Dashboard";

import { authorize } from "../requests";

const Body = () => {
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

  const transitionTimeout = { enter: 500, exit: 0 };

  useEffect(() => {
    const auth = async () => {
      await authorize().then((response) => {
        console.log(response);
      });
    };
    auth();
  }, []);

  return (
    <div
      className={`${styles.container} ${
        loggedIn ? styles.loggedInView : styles.loggedOutView
      }`}
    >
      <Fade
        in={!loggedIn && !registering}
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
