import React, { Profiler, useState } from "react";
import SideBar from "../../components/SideBar";
import {
  Stack,
  Drawer,
  Dialog,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { useAppContext } from "../../context/authentication";
import DashboardView, { Profile } from "@views/dashboard";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useViews } from "../../hooks/useViews";
import { motion } from "framer-motion";
import { useUser } from "../../hooks/useUser";
import { VeeDialog } from "../../components/Dialog/VeeDialog";
import { UpdatePassword } from "../../components/Dialog/UpdatePassword";
import useApi from "../../hooks/useApi";
import Mood from "../../components/Dialog/Mood";

const DashboardPage = () => {
  const { fullName, username, avatar, error, passwordChangeRequired } =
    useUser();
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [showProfile, setShowProfile] = useState(false);
  const [requirePassFix, setRequirePassFix] = useState(passwordChangeRequired);
  const [state, setState] = React.useState(false);
  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (even.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };
  const [user] = useAppContext();
  const [open, setOpen] = useState(false);
  const Views = useViews();
  const router = useRouter();
  const { data, loading } = useApi(
    `https://api.veezen.com/api/v1/survey/config/me`,
    { method: "GET" }
  );
  React.useEffect(() => {
    if (!user && !localStorage.getItem("vee_user_data")) router.push("/login");
  }, [user, router]);
  React.useEffect(() => {
    // setTimeout(() => setOpen(true), 2000);
    console.log(requirePassFix, "REQUIRE FIX");
  }, [requirePassFix]);
  React.useEffect(() => {
    if (data?.nextShow && !data?.answered) {
      const date = new Date(data?.nextShow);
      const now = new Date();
      const diffTime = date - now;
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log(data, diffTime);
      if (diffTime < 0) {
        setOpen(true);
        return;
      }
      console.log(data, diffTime);
      setTimeout(() => {
        setOpen(true);
        console.log(data, diffTime);
      }, diffTime);
    }
  }, [data]);

  return (
    <Stack direction="row" spacing={1} className="overflow-hidden  w-full">
      <UpdatePassword
        open={requirePassFix}
        handleClose={() => setRequirePassFix(false)}
      />
      {data?.questions && (
        <Mood
          open={true}
          setOpen={setOpen}
          type="battery"
          questions={data?.questions}
        />
      )}
      <Drawer anchor={"left"} open={state} onClose={() => setState(false)}>
        <SideBar setSelectedTab_={setSelectedTab} full />
      </Drawer>
      <div style={{ width: "4%" }}>
        <SideBar
          toggleDrawer={() => setState(true)}
          setSelectedTab_={setSelectedTab}
        />
      </div>

      <div className="ml-4" style={{ width: "96%", display: "flex" }}>
        <DashboardView
          // title={selectedTab}
          title={Views?.map((e) => e?.name === selectedTab && e?.title)}
          subTitle={Views?.map((e) => e?.name === selectedTab && e?.subTitle)}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        >
          {Views?.map((e, i) => (
            <motion.div
              key={i}
              initial={
                selectedTab === e?.name
                  ? { opacity: 1, position: "relative" }
                  : { opacity: 0, position: "absolute" }
              }
              animate={
                selectedTab === e?.name
                  ? { opacity: 1, position: "relative" }
                  : { opacity: 0, position: "absolute" }
              }
            >
              {" "}
              {React.cloneElement(e?.tab, { key: i })}
            </motion.div>
          ))}
        </DashboardView>
      </div>
      <motion.div
        initial={{ width: "0%" }}
        animate={showProfile ? { width: "25%" } : {}}
        transition={{ duration: 0.2 }}
      >
        <Profile
          name={fullName || "-"}
          username={username || "-"}
          rank={6}
          avActivity={"2 Hours"}
          favTheme={"Perso"}
          avatar={avatar || null}
        />
      </motion.div>
    </Stack>
  );
};

export default DashboardPage;
