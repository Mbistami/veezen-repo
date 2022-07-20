import React from "react";
import VeezenContainer from "../../components/VeezenContainer";
import VeezenRadioControl from "../../components/VeezenRadioControl";

import VeeButton from "../../components/VeeButton";

export const Civility = ({ setCurrentStep, setValue }) => {
  return (
    <VeezenContainer navbar="_blank" title="Civility">
      <VeezenRadioControl
        choices={["Female", "Male", "Other"]}
        submitText="Ok"
        onClick={() => setCurrentStep("phone")}
        setValue={(gender) =>
          setValue("gender", gender.toString().toUpperCase())
        }
      />
    </VeezenContainer>
  );
};
export default Civility;
