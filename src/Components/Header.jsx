import React from "react";

import rebelzLogo from "./../rebelz-logo-white-368x65.png";

import styles from "./Header.module.css";

const Header = () => {
  const title = "Sizing Feedback";
  return (
    <div className={styles.container}>
      <a
        href="https://rebelz.se/"
        className={styles.logo}
      >
        <img
          src={rebelzLogo}
          alt="Rebelz Logo"
        />
      </a>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Header;
