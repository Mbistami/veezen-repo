import React from "react";
import styles from "../styles/Navbar.module.css";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const mergeStyles = (styleArray) =>
  styleArray.map((style) => `${style}`).join(" ");

const NavbarItems = ({ path }) => {
  const route = useRouter();
  const handleClick = () => route.push("/under_construction");
  if (path == "home")
    return (
      <>
        <div className={styles.NavbarItems}>
          <div style={{ color: "#0fb2ae" }} onClick={handleClick}>
            Home
          </div>
          <div className={styles.navbarItemColored} onClick={handleClick}>
            About
          </div>
          <div onClick={handleClick}>Pricing</div>
          <div onClick={handleClick}>Contact</div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <div
              onClick={() => route.push("/login")}
              className={mergeStyles([styles.loginButton, styles.Button])}
            >
              <Typography>Log in</Typography>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <div
              onClick={() => route.push("/signin")}
              className={mergeStyles([styles.signinButton, styles.Button])}
            >
              <Typography>Sign In</Typography>
            </div>
          </div>
        </div>
      </>
    );
  else if (path == "login")
    return (
      <div
        className={[styles.NavbarItems, styles.loginNavbarContainer].join(" ")}
      >
        <div
          className={styles.clickableText}
          onClick={() => route.push("/signin")}
        >
          Vous n&apos;avez pas de compte?!
        </div>
        {/* <Typography
          className={[styles.Button, styles.loginNavbarButton].join(" ")}
          fontSize={17}
        >
          Sign in
        </Typography> */}
      </div>
    );
  else if (path == "signin")
    return (
      <div
        className={[styles.NavbarItems, styles.loginNavbarContainer].join(" ")}
      >
        <div
          className={styles.clickableText}
          onClick={() => route.push("/login")}
        >
          Vous avez un compte?!
        </div>
        {/* <div className={[styles.Button, styles.loginNavbarButton].join(" ")}>
          Log in
        </div> */}
      </div>
    );
  else if (path == "_blank") return <></>;
  else return <div>Unknow path...</div>;
};

export default NavbarItems;
