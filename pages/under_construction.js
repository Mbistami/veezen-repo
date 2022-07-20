import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { motion } from "framer-motion";
import AnimatedCharacters from "../components/AnimatedText";
import Image from "next/image";
import styles from "../styles/LoadingScreen.module.css";
import Logo from "../assets/logoVeezen.png";

const placeholderText = [
  { type: "heading1", text: "Veezen" },
  { type: "heading2", text: "Under construction" },
];
const container = {
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

export const UnderConstruction = () => {
  const [replay, setReplay] = React.useState(false);
  setTimeout(() => {
    setReplay(!replay);
  }, 1500);
  return (
    <div className={styles.ldContainer}>
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
            <div
              className="container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {placeholderText.map((e, i) => {
                return <AnimatedCharacters key={i} {...e} />;
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default UnderConstruction;
