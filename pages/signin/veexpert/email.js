import React from "react";
import FormTextField from "../../../components/FormItem";
import VeezenContainer from "../../../components/VeezenContainer";
import VeeButton from "../../../components/VeeButton";

export const email = () => {
  return (
    <VeezenContainer>
      <FormTextField inputPlaceholder="Email" label="Email" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* redirect using veebutton onClick={()=>{}} */}
        <VeeButton text="Ok" />
      </div>
    </VeezenContainer>
  );
};
export default email;
