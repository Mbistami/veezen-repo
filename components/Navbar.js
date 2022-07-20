import React from "react";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import LogoVeezen from "../assets/logoVeezen.png";
import VeezenText from "../assets/VeezenText.png";
import NavbarItems from "../hooks/useNavbar";
import { useRouter } from "next/router";

function Navbar({ path }) {
  const router = useRouter();
  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.NavbarLogoContainer}>
        <Image width={58} height={56} src={LogoVeezen} alt="Veezen_Icon" />
        <br />
        <Image
          className={styles.logoText}
          width={100}
          height={25}
          src={VeezenText}
          alt="Veezen"
        />
      </div>
      <NavbarItems path={path} />
    </div>
  );
}

export default Navbar;
