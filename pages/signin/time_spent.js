import React from "react";
import { Stack } from "@mui/material";
import VeezenContainer from "../../components/VeezenContainer";
import FormTextField from "../../components/FormItem";
import VeeButton from "../../components/VeeButton";

const TimeSpent = ({ setCurrentStep, setValue }) => {
  return (
    <VeezenContainer title="How many years of experience do you have as an expert?*">
      <br />
      <FormTextField
        inputPlaceholder="10"
        type="number"
        onChange={(e) =>
          setValue("experienceDuration", parseInt(e?.target?.value))
        }
      />
      <Stack direction="row" justifyContent="center">
        <VeeButton text="Ok" type="submit" />
      </Stack>
    </VeezenContainer>
  );
};
export default TimeSpent;
