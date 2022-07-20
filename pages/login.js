import React, { useState } from "react";
import VeezenContainer from "../components/VeezenContainer";
import { TextField, Typography, CircularProgress } from "@mui/material";
import styles from "../styles/Login.module.css";
import { mergeStyles } from "../utils";
import { useRouter } from "next/router";
import FormTextField from "../components/FormItem";
import { motion } from "framer-motion";
import { useAppContext } from "../context/authentication";
import PerformanceMood from "../components/Dashboard/Charts/PreformanceMood";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useAppContext();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = () => {
    setLoading(true);
    fetch(`https://api.veezen.com/api/v1/account/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        const Authorization = `Bearer`.concat(" ", await res.text());
        if (res.status === 200)
          fetch(`https://api.veezen.com/api/v1/account/auth/getUserUsingJwt`, {
            method: "GET",
            headers: { Authorization },
          }).then((res) =>
            res.status === 200
              ? res.json().then((data) => {
                  setUser({ ...data, Authorization });
                  localStorage.setItem(
                    "vee_user_data",
                    JSON.stringify({
                      ...data,
                      Authorization,
                    })
                  );
                  router.push("/dashboard");
                })
              : () => {
                  setLoading(false);
                  setError(true);
                }
          );
        else {
          setError(true);
          setTimeout(() => setError(false), 2000);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };
  React.useEffect(() => {
    if (user) router.push("/dashboard");
    router.prefetch("/dashboard");
  }, [user, router, error]);
  return (
    <VeezenContainer navbar="login" title="Connectez-vous">
      <div className={styles.loginForm}>
        <FormTextField
          inputPlaceholder="E.g: Mohassan@gmail.com"
          label="E-Mail"
          onChange={(e) => setUsername(e?.target.value)}
        />
        <div className={styles.formItem}>
          <FormTextField
            inputPlaceholder="Mot de passe"
            label="Mot de passe"
            type="password"
            onChange={(e) => setPassword(e?.target.value)}
          />
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
          >
            <Typography
              fontFamily={"'DM Sans', sans-serif"}
              textAlign="center"
              variant="subtitle2"
              color="#057BA3"
              lineHeight="20px"
            >
              Mot de passe oublie?
            </Typography>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={error ? { opacity: 1 } : { opacity: 0 }}
        >
          <Typography
            className="font-primary text-center"
            style={{ color: "red" }}
          >
            Account not found! Try again.
          </Typography>
        </motion.div>

        <div className={styles.connectButton}>
          {loading ? (
            <div
              style={{ minWidth: "200px" }}
              className="flex flex-row justify-center items-center"
            >
              <CircularProgress />
            </div>
          ) : (
            <button
              className={mergeStyles([styles.loginNavbarButton, styles.Button])}
              onClick={login}
            >
              Se connecter
            </button>
          )}
        </div>
      </div>
    </VeezenContainer>
  );
}

export default Login;
