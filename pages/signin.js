import React, { useEffect, useState } from "react";
import steps from "../components/steps";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SignInProcess = () => {
  const [currentStep, setCurrentStep] = useState("signin");
  const { handleSubmit, register, setValue } = useForm();
  const [state, setState] = useState("");
  const router = useRouter();
  const uploadFilesArray = async (files) => {
    const secureUrls = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "aykgmsli");
      formData.append("tags", "browser upload");
      const res = await fetch(`https://api.cloudinary.com/v1_1/veezen/upload`, {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
      });
      if (res.status === 200) {
        const data = await res.json();
        secureUrls.push(data.secure_url);
      }
    }
    return secureUrls;
  };
  const processData = (data) => {};
  const onSubmit = async (data) => {
    const toClear = ["cv", "diplomas", "picture"];
    const keys = Object.keys(data);
    const orderedErrorSteps = [];
    for (var i = 0; i <= keys.length; i++) {
      const e = keys[i];
      if (!data[e]) {
        steps.map((step, i) => {
          const stepError = step?.fields?.find((field) => field === e)
            ? step
            : null;

          if (stepError) orderedErrorSteps.push(stepError);
        });
        orderedErrorSteps.sort((a, b) => a.order - b.order);
        break;
      }
    }
    // console.log(data, keys, orderedErrorSteps.length, orderedErrorSteps[0]);

    if (orderedErrorSteps.length > 0) {
      setCurrentStep(orderedErrorSteps[0].step);
      return;
    } else setCurrentStep("saved");
    setState("uploading files");
    const cvUrl = await uploadFilesArray(data?.cv);
    const deplomesAndCertificates = await uploadFilesArray(data?.diplomas);
    const avatar = await uploadFilesArray(data?.picture);
    setState("Files uploaded successfully\nCeating your account!");
    toClear.map((e) => delete data[e]);
    fetch(`https://api.veezen.com/api/v1/account/coach/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        avatar: avatar[0],
        cvUrl: cvUrl[0],
        deplomesAndCertificates,
        fees: 0,
        bio: "",
        coverImageUrl: "",
      }),
    })
      .then((res) => res.status == 200 && router.push("/login"))
      .catch((err) => console.error(err));
  };

  const registerFields = () =>
    steps.forEach((e) =>
      e?.fields?.forEach((field) => {
        console.log(field);
        register(field);
      })
    );

  useEffect(() => {
    if (steps) registerFields();
    console.log(steps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {steps?.map(
          (e, k) =>
            currentStep === e?.step &&
            React.cloneElement(
              e?.element,
              e?.step === "saved"
                ? { setValue, key: k, setCurrentStep, state }
                : { setValue, key: k, setCurrentStep }
            )
        )}
      </form>
    </>
  );
};
export default SignInProcess;
