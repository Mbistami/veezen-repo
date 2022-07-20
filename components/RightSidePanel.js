import React from "react";
import Image from "next/image";
import BackgroundPreview from "../assets/background-image-1.png";
import BackgroundPreview_1 from "../assets/background-image-2.png";
import BackgroundPreview_2 from "../assets/background-image-3.png";
import styles from "../styles/Home.module.css";

const RightSidePanel = () => {
  return (
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
  );
};

export default RightSidePanel;
