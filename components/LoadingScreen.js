import React from "react";
import { motion } from "framer-motion";
import styles from "../styles/LoadingScreen.module.css";
import Logo from "../assets/logoVeezen.png";
import Image from "next/image";
import { Typography } from "@mui/material";
import Head from "next/head";
import AnimatedCharacters from "./AnimatedText";

const placeholderText = { type: "heading1", text: "Veezen" };
const container = {
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const LoadingScreen = ({ setLoading }) => {
  const [replay, setReplay] = React.useState(true);
  const [replay_, setReplay_] = React.useState(true);
  setTimeout(() => {
    setReplay(!replay);
  }, 850);
  setTimeout(() => {
    setReplay_(!replay_);
  }, 1000);
  return (
    <div
      className={styles.ldContainer}
      onClick={() => {
        if (setLoading) return setLoading(false);
      }}
    >
      <Head key="home">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>Veezen</title>
      </Head>
      <div className={styles.ldInnerContainer}>
        <div>
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.85, repeat: Infinity }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div className={styles.ldLogoParent}>
              <Image src={Logo} alt="Veezen" width={56} height={58} />
            </div>
          </motion.div>
          <motion.div
            className="App"
            initial="hidden"
            animate={replay ? "visible" : "hidden"}
            variants={container}
            transition={{ repeat: Infinity }}
          >
            <div className="container">
              <AnimatedCharacters {...placeholderText} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default LoadingScreen;
