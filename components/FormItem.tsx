import React from "react";
import styles from "../styles/Login.module.css";
import { Typography } from "@mui/material";

const FormTextField = ({
  label,
  inputPlaceholder,
  type,
  register,
  onChange,
}: {
  label?: string;
  inputPlaceholder?: string;
  type?: string;
  register?: any;
  onChange?: any;
}) => {
  return (
    <div className={styles.formItem}>
      {label && (
        <Typography
          variant="subtitle1"
          fontFamily={"Josefin Sans, sans-serif"}
          className={styles.label}
        >
          {label}
        </Typography>
      )}
      <input
        type={type ? type : "text"}
        placeholder={inputPlaceholder}
        onChange={onChange}
        {...register}
      />
    </div>
  );
};
export default FormTextField;
