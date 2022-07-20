import React from "react";
import { mergeStyles } from "../utils";
import styles from "../styles/CollabVeexpert.module.css";

export const VeeButton = ({ text, onClick, type }) => {
  return (
    <button
      className={mergeStyles([
        styles.Button,
        styles.loginNavbarButton,
        styles.formButtonColor,
      ])}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {text}
    </button>
  );
};
export default VeeButton;
