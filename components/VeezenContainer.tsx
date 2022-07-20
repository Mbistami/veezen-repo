import { Typography } from "@mui/material";
import React from "react";
import styles from "../styles/VeezenContainer.module.css";
import Navbar from "./Navbar";
import Head from "next/head";

const VeezenContainer = ({
  children,
  navbar,
  title,
  description,
}: {
  children: any;
  navbar: any;
  title?: any;
  description?: any;
}) => {
  return (
    <>
      <Head key="home">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Josefin+Sans:wght@400;700;600&display=swap"
          rel="stylesheet"
        />
        <title>Veezen</title>
      </Head>
      <div className={styles.veezenContainer}>
        <Navbar path={navbar} />
        <div className={styles.bigCircle} />
        <div className={styles.veezenContainerChildren}>
          <div className={styles.innerBox}>
            {title ? (
              <Typography
                fontFamily="'DM Sans', sans-serif"
                textAlign="center"
                pt={2}
                variant="h3"
                fontSize={40}
                color="#142047"
                fontWeight={700}
                letterSpacing={1}
              >
                {title}
              </Typography>
            ) : (
              <div className={styles.descriptionContainer}>
                <p className={styles.description}>{description}</p>
              </div>
            )}
            <div className={styles.children}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VeezenContainer;
