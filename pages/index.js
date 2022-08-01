import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/authentication";
import useApi from "../hooks/useApi";
import styles from "../styles/Home.module.css";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState();
  let { loading, data } = useApi(
    "https://api.veezen.com/api/v1/account/auth/getUserUsingJwt"
  );
  useEffect(() => {
    setUser(data);
    router.prefetch("/home");
    if (user && user.isLogged == true) router.push("/dashboard");
  }, [loading, data, setUser, router, user]);
  if (!user) return <LoadingScreen />;
  return (
    <>
      <div className={styles.container}></div>
    </>
  );
}
