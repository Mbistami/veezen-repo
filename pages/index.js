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
  let { loading, data } = useApi("long api");
  useEffect(() => {
    setUser(data);
    router.prefetch("/home");
    if (user && user.isLogged == true) router.push("/dashboard");
    else if (user && user.error == true) router.push("/login");
    else router.push("/home");
  }, [loading, data, setUser, router, user]);
  // if (!user) return <LoadingScreen />;
  return (
    <>
      <div className={styles.container}></div>
    </>
  );
}
