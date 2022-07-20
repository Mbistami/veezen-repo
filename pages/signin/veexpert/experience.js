import React from "react";
import VeezenContainer from "../../../components/VeezenContainer";
import FormTextField from "../../../components/FormItem";
import VeeButton from "../../../components/VeeButton";
import { Stack, TextareaAutosize } from "@mui/material";
import styles from "../../../styles/Login.module.css";

export const expertise = ({ setCurrentStep, setValue }) => {
  return (
    <VeezenContainer title="A concrete experience*" navbar="_blank">
      <br />
      <div className={styles.formItem}>
        <TextareaAutosize
          // type="textarea"
          minRows={2}
          inputPlaceholder="Your experience"
          placeholder="Accompanying people and companies in their continuous evolution, developing employees and teams... "
          label=""
          style={{ width: "100%" }}
          onChange={(e) => setValue("concreteExperience", e?.target?.value)}
        />
      </div>
      <Stack direction="row" justifyContent="center" pt={2}>
        <VeeButton text="Ok" onClick={() => setCurrentStep("lang")} />
      </Stack>
    </VeezenContainer>
  );
};
export default expertise;
