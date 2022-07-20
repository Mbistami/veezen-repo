import React, { useEffect, useState } from "react";
import VeezenContainer from "../../../components/VeezenContainer";
import { useRouter } from "next/router";
import Script from "next/script";
import { height } from "@mui/system";

const Start = () => {
  const router = useRouter();
  const [h, setH] = useState(800);
  useEffect(() => setH(window.innerHeight > 800 ? 800 : 500));
  return (
    <VeezenContainer navbar="_blank" title=" ">
      <div
        data-tf-widget="ob6UWdcq"
        data-tf-iframe-props="title=Collaborator - VEEZEN"
        data-tf-medium="snippet"
        data-tf-hidden="utm_source=xxxxx"
        style={{ width: "100%", minHeight: 500, height: h }}
      ></div>
      <Script src="https://embed.typeform.com/next/embed.js"></Script>
    </VeezenContainer>
  );
};
export default Start;
