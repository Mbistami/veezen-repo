import React, { useEffect, useRef } from "react";
import LandingPage from "../components/LandingPageComponent";
import Announcement from "../components/Announcement";

function Home() {
  const anRef = useRef();
  return (
    <>
      <LandingPage scrollTo={anRef} />
      <Announcement aRef={anRef} />
    </>
  );
}

export default Home;
