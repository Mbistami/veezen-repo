import React from "react";
import VeezenContainer from "../../../components/VeezenContainer";
import FormTextField from "../../../components/FormItem";
import VeeButton from "../../../components/VeeButton";
import { Stack, TextareaAutosize } from "@mui/material";
import styles from "../../../styles/Login.module.css";

export const expertise = ({ setCurrentStep, setValue }) => {
  return (
    <VeezenContainer title="Expertises*" navbar="_blank">
      <br />
      <div className={styles.formItem}>
        <TextareaAutosize
          // type="textarea"
          minRows={2}
          inputPlaceholder="Your experience"
          placeholder="Wellness coaching, work psychotherapy, educational coaching...."
          label=""
          style={{ width: "100%" }}
          onChange={(e) => setValue("expertise", e?.target.value.split("\n"))}
        />
      </div>
      <Stack direction="row" justifyContent="center" pt={2}>
        <VeeButton text="Ok" onClick={() => setCurrentStep("diplomas")} />
      </Stack>
    </VeezenContainer>
  );
};
export default expertise;
