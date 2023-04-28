import styles from "./App.module.css";

import { Card, CircularProgress, Fade } from "@mui/material";

import { authorize } from "./requests";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";

import Header from "./Components/Header";
// import Body from "./Components/Body";
import { useState, useEffect } from "react";

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

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(blankUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registering, setRegistering] = useState(false);

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
    setRegistering(false);
    setLoading(false);
  };

  const transitionToRegistration = () => {
    setLoading(true);
    setRegistering(true);
    setLoading(false);
  };

  return (
    <>
      <Fade
        in={loading}
        unmountOnExit
      >
        <CircularProgress />
      </Fade>
      <Fade
        in={!loggedIn && !registering && !loading}
        mountOnEnter
        unmountOnExit
        timeout={transitionTimeout}
      >
        <Card className={`${styles.container} ${styles.loggedOutView}`}>
          <Header />
          <Login
            user={user}
            setUser={setUser}
            setRegistering={setRegistering}
            setLoggedIn={setLoggedIn}
            blankUser={blankUser}
            transitionToDashboard={transitionToDashboard}
            transitionToRegistration={transitionToRegistration}
          />
        </Card>
      </Fade>

      <Fade
        in={loggedIn && !loading}
        unmountOnExit
        timeout={transitionTimeout}
      >
        <Card className={`${styles.container} ${styles.loggedInView}`}>
          <Header />
          <Dashboard
            user={user}
            setUser={setUser}
            setLoggedIn={setLoggedIn}
            blankUser={blankUser}
            transitionToLogin={transitionToLogin}
          />
        </Card>
      </Fade>
      <Fade
        in={!loggedIn && registering}
        unmountOnExit
        timeout={transitionTimeout}
      >
        <Card className={`${styles.container} ${styles.loggedOutView}`}>
          <Header />
          <Register
            user={user}
            setUser={setUser}
            setRegistering={setRegistering}
            blankUser={blankUser}
            transitionToLogin={transitionToLogin}
          />
        </Card>
      </Fade>
    </>
  );
}

export default App;
