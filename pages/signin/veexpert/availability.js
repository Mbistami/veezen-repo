import React from "react";
import VeezenContainer from "../../../components/VeezenContainer";
import VeezenRadioControl from "../../../components/VeezenRadioControl";

const certified = ({ setCurrentStep, setValue }) => {
  return (
    <VeezenContainer title="Certified expert?*">
      <div>
        <VeezenRadioControl
          choices={["Part-time", "Full-time", "Other"]}
          submitText="Ok"
          onClick={() => setCurrentStep("experience_number")}
          setValue={(gender) =>
            setValue(
              "availablity",
              gender.toString().toUpperCase()?.replace("-", "_")
            )
          }
        />
      </div>
    </VeezenContainer>
  );
};
export default certified;
