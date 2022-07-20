import "../styles/globals.css";
import {
  AppWrapper,
  LoadingWrapper,
  useLoadingContext,
  CalWrapper,
} from "../context";
import Head from "next/head";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect } from "react";

const LoadingScreenHandler = () => {
  const { loading, setLoading } = useLoadingContext();
  return <>{loading && <LoadingScreen />}</>;
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head key="home">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>Veezen</title>
      </Head>
      <AppWrapper>
        <LoadingWrapper>
          <CalWrapper>
            <LoadingScreenHandler />
            <Component {...pageProps} />
          </CalWrapper>
        </LoadingWrapper>
      </AppWrapper>
    </>
  );
}

export default MyApp;
