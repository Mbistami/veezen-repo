import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  DashboardOutlined,
  GroupOutlined,
  CalendarTodayOutlined,
  ShowChartOutlined,
  InfoOutlined,
  SettingsOutlined,
} from "@material-ui/icons";
import { Logout, Menu } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppContext } from "../../context";
import Image from "next/image";
import LogoVeezen from "../../assets/logoVeezen.png";
import VeezenText from "../../assets/VeezenText.png";
import styles from "../../styles/Navbar.module.css";

export const SideBar = ({ setSelectedTab_, full, toggleDrawer }) => {
  const [user, setUser] = useAppContext();
  const router = useRouter();
  const Tabs = [
    {
      icon: <Menu fontSize="20px" />,
      onClick: () => toggleDrawer(),
    },
    {
      icon: <DashboardOutlined fontSize="20px" />,
      text: "Dashboard",
    },
    {
      icon: <GroupOutlined fontSize="20px" />,
      text: "Community",
    },
    {
      icon: <ShowChartOutlined fontSize="20px" />,
      text: "Analytics",
    },
    {
      icon: <Logout fontSize="20px" />,
      text: "Logout",
      onClick: () => {
        window.open(`${process.env.API_AUTH_LINK}`, "_self");
        localStorage.removeItem("vee_user_data");
        setUser(null);
      },
    },
  ];
  const [tabs, setTabs] = useState(Tabs);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  React.useEffect(
    () => setSelectedTab_(selectedTab),
    [selectedTab, setSelectedTab_]
  );
  React.useEffect(() => {
    router.prefetch("/login");
  }, []);

  return (
    <Box
      direction="column"
      spacing={1}
      alignItems="center"
      pt={2}
      borderRight="0px solid #CECDCD"
      height="100%"
      className="min-w-[300px]"
    >
      {/* extra div as a wrapper to avoid edditing CSS (generic) class */}
      {/* <div className="pt-8">
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
      </div> */}
      <Stack
        pt={12}
        spacing={5}
        justifyContent="center"
        alignItems="center"
        className="absolute top-1/3 -translate-y-1/3 left-5"
      >
        {tabs.map(({ icon, text, onClick }, i) => {
          if (full && !text) return;
          return (
            <Stack
              key={i}
              direction="row"
              spacing={3}
              color="black"
              sx={[
                selectedTab !== text
                  ? { opacity: 0.65, cursor: "pointer" }
                  : { opacity: 1, color: "#0292b7", cursor: "pointer" },
                () => ({
                  "&:hover": {
                    opacity: 0.8,
                  },
                }),
              ]}
              onClick={onClick ? onClick : () => setSelectedTab(text)}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                direction="row"
                className="px-3 py-1"
                onClick={
                  text
                    ? () => setSelectedTab(text)
                    : () => {
                        toggleDrawer(true);
                      }
                }
              >
                {icon}
              </Stack>
              {full && text && (
                <Stack sx={{ width: "100%", position: "relative" }}>
                  <Typography
                    fontFamily="'Nunito', sans-serif"
                    fontSize={19}
                    fontWeight={selectedTab === text && 500}
                    h={2}
                    px={2}
                    py={1}
                    sx={{ width: "180px" }}
                  >
                    {text}
                  </Typography>
                  {i == 2 && (
                    <div className="absolute top-1/2 right-1 w-4 h-4 text-white bg-red-500 -translate-y-1/2">
                      <p className="text-xs text-center">1</p>
                    </div>
                  )}
                </Stack>
              )}
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};
export default SideBar;
