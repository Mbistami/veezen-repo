import React from "react";
import VeezenContainer from "../../components/VeezenContainer";
import styles from "../../styles/CollabVeexpert.module.css";
import Image from "next/image";
import VeexpertImage from "../../assets/veexpert.png";
import CollabImage from "../../assets/collab.png";
import { mergeStyles } from "../../utils.js";
import { useRouter } from "next/router";

const CollabVeexpert = ({ setCurrentStep }) => {
  return (
    <VeezenContainer navbar="_blank" title="I'am...">
      <div className={styles.CollabVeexpert}>
        <div>
          <Image
            src={CollabImage}
            style={{ backgroundColor: "#E0E0E0" }}
            alt="Collaborator"
            width={213}
            height={250}
          />
          <div>
            <button
              className={mergeStyles([styles.Button, styles.loginNavbarButton])}
              data-path="collaborator"
            >
              Client
            </button>
          </div>
        </div>
        <div>
          <Image
            src={VeexpertImage}
            style={{ backgroundColor: "#E0E0E0" }}
            alt="Veexpert"
            width={213}
            height={250}
          />
          <div>
            <button
              className={mergeStyles([styles.Button, styles.loginNavbarButton])}
              onClick={() => setCurrentStep("starter")}
              data-path="veexpert"
            >
              Coach/Expert
            </button>
          </div>
        </div>
      </div>
    </VeezenContainer>
  );
};
export default CollabVeexpert;
