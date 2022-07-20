import React from "react";
import styles from "../styles/RadioControl.module.css";
import { Typography } from "@mui/material";
import { mergeStyles } from "../utils";
import buttonStyles from "../styles/CollabVeexpert.module.css";

const VeezenRadioControl = ({ choices, submitText, onClick, setValue }) => {
  const [isActive, setIsActive] = React.useState(null);
  return (
    <div className={styles.radioControl}>
      {choices.map((choice, index) => {
        return (
          <div
            className={
              isActive != index
                ? styles.choice
                : mergeStyles([styles.choice, styles.active])
            }
            key={index}
            onClick={() => {
              setValue(choice);
              setIsActive(index);
            }}
          >
            <Typography
              fontSize={22}
              fontFamily="'DM Sans', sans-serif"
              fontWeight={400}
            >
              {choice}
            </Typography>
          </div>
        );
      })}
      <button
        className={mergeStyles([
          buttonStyles.Button,
          buttonStyles.loginNavbarButton,
          buttonStyles.formButtonColor,
        ])}
        onClick={onClick}
      >
        {submitText}
      </button>
    </div>
  );
};
export default VeezenRadioControl;
