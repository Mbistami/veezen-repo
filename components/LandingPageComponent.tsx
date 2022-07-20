import React, { MutableRefObject, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Close, Info } from "@material-ui/icons";
import Navbar from "./Navbar";
import LeftSidePanel from "../components/LeftSidePanel";
import BackgroundPreview from "../assets/background-image-1.png";
import BackgroundPreview_1 from "../assets/background-image-2.png";
import BackgroundPreview_2 from "../assets/background-image-3.png";

export default function LandingPageComponent({
  scrollTo,
}: {
  scrollTo: MutableRefObject<null | HTMLParagraphElement>;
}) {
  const [playWarningAnimation, setPlayWarningAnimation] = React.useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setPlayWarningAnimation(true), 1200);
  }, []);
  const handleScroll = () =>
    scrollTo.current?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className={styles.homeContainer}>
      <motion.div
        className={styles.warning}
        initial={{ opacity: 0, height: 0 }}
        animate={
          playWarningAnimation ? { opacity: 1, height: 45 } : { opacity: 0 }
        }
        transition={{ stiffness: 550, type: "spring", damping: 25 }}
        whileHover={{ height: 55 }}
        onClick={() => handleScroll()}
      >
        <div className={styles.warningContainer}>
          <div>
            <Info />
            <Typography>Click here! and get your webinary ticket.</Typography>
          </div>
          <Close onClick={() => setPlayWarningAnimation(false)} />
        </div>
      </motion.div>
      <Navbar path="home" />
      <div className={styles.homeBigCircle}>
        <div className={styles.innerImages}>
          <div className={styles.backgroundImagePreview}>
            <Image
              className={styles.backgroundImagePreview_1}
              src={BackgroundPreview}
              alt="background image preview"
            />
          </div>
          <div className={styles.backgroundImagePreview_}>
            <Image src={BackgroundPreview_1} alt="background image preview" />
          </div>
          <div className={styles.backgroundImagePreview__}>
            <Image src={BackgroundPreview_2} alt="background image preview" />
          </div>
        </div>
      </div>
      <LeftSidePanel />
    </div>
  );
}
