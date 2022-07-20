import React from "react";
import VeezenContainer from "../../../components/VeezenContainer";
import VeezenRadioControl from "../../../components/VeezenRadioControl";

const certified = ({ setCurrentStep, setValue }) => {
  return (
    <VeezenContainer title="Language*">
      <div>
        <VeezenRadioControl
          choices={["French", "English", "Arabic", "Other"]}
          submitText="Ok"
          onClick={() => setCurrentStep("availability")}
          setValue={(gender) => setValue("languages", [gender])}
        />
      </div>
    </VeezenContainer>
  );
};
export default certified;
