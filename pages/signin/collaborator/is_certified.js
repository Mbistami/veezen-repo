import React from "react";
import VeezenContainer from "../../../components/VeezenContainer";
import VeezenRadioControl from "../../../components/VeezenRadioControl";

const is_certified = () => {
  return (
    <VeezenContainer title="Certified expert?" navbar="_blank">
      <VeezenRadioControl choices={["Yes", "No"]} submitText="Ok" />
    </VeezenContainer>
  );
};
export default is_certified;
