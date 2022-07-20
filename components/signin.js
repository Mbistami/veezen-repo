import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import VeezenContainer from "../components/VeezenContainer";
import { TextField, Typography } from "@mui/material";
import styles from "../styles/Login.module.css";
import more_styles from "../styles/Signin.module.css";
import { mergeStyles } from "../utils.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormTextField from "../components/FormItem";
import steps from "../components/steps";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const Signin = ({ setCurrentStep, setValue }) => {
  const [loading, setLoading] = React.useState(true);
  const [showing, setShowing] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <VeezenContainer navbar={"signin"} title="Inscrivez vous">
        <div className={styles.loginForm}>
          <FormTextField
            label="Username"
            inputPlaceholder="E.g: Aziz El Salhi"
            onChange={(e) => {
              setValue("userName", e?.target?.value);
            }}
          />
          <FormTextField
            label="Nom complet"
            inputPlaceholder="E.g: Aziz El Salhi"
            onChange={(e) => setValue("fullName", e?.target?.value)}
          />
          <FormTextField
            label="E-mail"
            inputPlaceholder="E.g: Mohassan@gmail.com"
            onChange={(e) => setValue("email", e?.target?.value)}
          />
          <div>
            <Typography
              variant="subtitle1"
              fontFamily={"Josefin Sans, sans-serif"}
              className={styles.label}
            >
              Mot de passe
            </Typography>
            <div className={more_styles.showableControl}>
              <input
                className={more_styles.showablePassword}
                placeholder="8 caractères minimum"
                type={showing ? "text" : "password"}
                onChange={(e) => setValue("password", e?.target?.value)}
              />
              <div
                className={more_styles.showPassword}
                onClick={() => setShowing(!showing)}
              >
                {showing ? (
                  <VisibilityIcon style={{ color: "#057BA3" }} />
                ) : (
                  <VisibilityOffIcon style={{ color: "#057BA3" }} />
                )}
              </div>
            </div>
            <Typography
              fontFamily={"'DM Sans', sans-serif"}
              textAlign="center"
              variant="subtitle2"
              color="#057BA3"
              lineHeight="20px"
              mt={2}
            >
              Mot de passe oublie?
            </Typography>
          </div>
          <div className={styles.connectButton}>
            <button
              className={mergeStyles([styles.loginNavbarButton, styles.Button])}
              onClick={() => setCurrentStep("collab_veexpert")}
            >
              S&apos;inscrire
            </button>
          </div>
        </div>
      </VeezenContainer>
      {loading && <LoadingScreen setLoading={setLoading} />}
    </>
  );
};

export const Starter = ({ setCurrentStep }) => (
  <VeezenContainer
    navbar="_blank"
    description="Veezen, a human solution from Work-Life Harmony, offers to support you in your daily life challenges, whether they are professional or personal, for a better engagement in all spheres of your life."
  >
    <div className={styles.connectButton}>
      <button
        className={mergeStyles([styles.loginNavbarButton, styles.Button])}
        onClick={() => setCurrentStep("civility")}
      >
        Start
      </button>
    </div>
  </VeezenContainer>
);
