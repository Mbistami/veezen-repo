import React from "react";
import VeezenContainer from "../../../components/VeezenContainer";
import VeezenRadioControl from "../../../components/VeezenRadioControl";

const certified = ({ setCurrentStep, setValue }) => {
  return (
    <VeezenContainer title="Certified expert?*">
      <div>
        <VeezenRadioControl
          choices={["Yes", "No"]}
          submitText="Ok"
          setValue={(choice) => {
            setValue("certifiedCoach", choice === "Yes");
          }}
          onClick={() => setCurrentStep("expertise")}
        />
      </div>
    </VeezenContainer>
  );
};
export default certified;
