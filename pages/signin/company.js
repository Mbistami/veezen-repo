import React from "react";
import VeezenContainer from "../../components/VeezenContainer";
import FormTextField from "../../components/FormItem";
import VeeButton from "../../components/VeeButton";

function Company({ setCurrentStep, setValue }) {
  const handleData = (key, val) => setValue(key, val);
  return (
    <VeezenContainer title="Company">
      <br />
      <FormTextField
        inputPlaceholder="Veezen"
        onChange={(e) => handleData("company", e?.target?.value)}
      />
      <br />
      <div className="center" onClick={() => setCurrentStep("cv")}>
        <VeeButton text="Ok" />
      </div>
    </VeezenContainer>
  );
}
export default Company;
