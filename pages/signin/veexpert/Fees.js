import React from "react";
import { Stack } from "@mui/material";
import VeezenContainer from "../../../components/VeezenContainer";
import FormTextField from "../../../components/FormItem";
import VeeButton from "../../../components/VeeButton";

const Fees = ({ setCurrentStep }) => {
  return (
    <VeezenContainer title="How many years of experience do you have as an expert?*">
      <br />
      <FormTextField inputPlaceholder="Dh or €" />
      <Stack direction="row" justifyContent="center">
        <VeeButton
          text="Ok"
          // onClick={() => setCurrentStep("saved")}
          type="submit"
        />
      </Stack>
    </VeezenContainer>
  );
};
export default Fees;
