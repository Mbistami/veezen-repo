import React from "react";
import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "../styles/Home.module.css";

const LeftSidePanel = () => {
  return (
    <div className={styles.leftPanel}>
      <Typography
        fontSize={83}
        sx={{ lineHeight: "90px" }}
        className={styles.bigTitle}
      >
        Work-Life
        <br />
        Harmony matters.
      </Typography>
      <Typography
        className={styles.smallTitle}
        fontSize={30}
        paddingLeft={2}
        sx={{ opacity: 0.9 }}
      >
        For the blossoming of your collaborators
      </Typography>
      <div className={styles.getStartedContainer}>
        <input
          placeholder="Enter your email address"
          className={styles.getStartedEmail}
        />
        <div className={styles.getStarted}>
          <button>Get Started</button>
          <ArrowForwardIcon
            color="white"
            sx={{ color: "white", height: "50px" }}
          />
        </div>
      </div>
    </div>
  );
};
export default LeftSidePanel;
