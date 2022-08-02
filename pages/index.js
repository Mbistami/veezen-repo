import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/authentication";
import useApi from "../hooks/useApi";
import styles from "../styles/Home.module.css";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useAppContext();
  // let { loading, data } = useApi(
  //   `http://localhost:3000/session?uuid=${router.query?.session_id}`
  // );
  useEffect(() => {
    // setUser(data);
    console.log(router.query?.session_id);
    fetch(
      `${process.env.API_SESSION_LINK}/session?uuid=${router.query?.session_id}`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.status === 200 && router.query?.session_id !== undefined)
        res.json().then((data) => {
          const { authorization } = data;
          fetch(`https://api.veezen.com/api/v1/account/auth/getUserUsingJwt`, {
            method: "GET",
            headers: { authorization },
          }).then((res_) => {
            console.log(res);
            if (res_.status === 200) {
              res_.json().then((data) => {
                setUser({ ...data, Authorization: authorization });
                localStorage.setItem(
                  "vee_user_data",
                  JSON.stringify({
                    ...data,
                    Authorization: authorization,
                  })
                );
                console.log("LOGGED IN REDIRECTION");
                router.push("/dashboard");
              });
            }
          });
          setUser(data);
        });
    });
    if (user) router.push("/dashboard");
  }, [router]);
  if (!user) return <LoadingScreen />;
  return (
    <>
      <LoadingScreen />
    </>
  );
}
