import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "context";

const useApi = (url, options, headers) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [user, setUser] = useAppContext();
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const Authorization = user?.Authorization;

  const mutate = () => setRefresh(!refresh);
  const fetchApi = () => {
    setLoading(true);
    fetch(url, { ...options, headers: { Authorization, ...headers } })
      .then((response) => {
        if (response.status === 200) return response.json();
        if (response.status === 404)
          console.log("ERROR ON AUTHENTICATION 404x7");
        if (response.status === 401) {
          response.text().then((txt) => console.log(txt));
        }
      })
      .then((json) => {
        setLoading(false);
        setData(json);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setData({ error: false, isLogged: true });
        if (e.toString().search("401")) {
          // router?.push("/login");
          // localStorage.removeItem("vee_user_data");
          // setUser(null);
        }
      });
  };
  useEffect(() => {
    if (user) fetchApi();
  }, [user]);
  useEffect(() => {
    fetchApi();
  }, [refresh]);

  return { loading, data, mutate };
};

export default useApi;
