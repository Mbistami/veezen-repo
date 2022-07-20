import React from "react";
import VeezenContainer from "../../components/VeezenContainer";
import FormTextField from "../../components/FormItem";
import VeeButton from "../../components/VeeButton";
import { useRouter } from "next/router";

export const Address = ({ setCurrentStep, setValue }) => {
  const router = useRouter();
  const handleData = (key, val) => setValue(key, val);
  const handleContinue = () => {
    setCurrentStep("company");
  };
  return (
    <VeezenContainer navbar="_blank" title="Address">
      <br />
      <FormTextField
        inputPlaceholder="12 Boulevard Mohamed V"
        label="Number, street"
        onChange={(e) => setValue("street", e?.target?.value)}
      />
      <br />
      <FormTextField
        inputPlaceholder="Casablanca"
        label="City"
        onChange={(e) => setValue("city", e?.target?.value)}
      />
      <br />
      <FormTextField
        inputPlaceholder="Maroc"
        label="Country"
        onChange={(e) => setValue("country", e?.target?.value)}
      />
      <br />
      <div className="center">
        <VeeButton text="Ok" onClick={handleContinue} />
      </div>
    </VeezenContainer>
  );
};
export default Address;
