import { Analytics, Events, Dashboard, Community } from "@views/dashboard";
import { getCurrentMonth } from "../utils";
import { useAppContext } from "../context";

export const useViews = () => {
  const [user] = useAppContext();
  const greetingUser = `Hi ${
    user?.firstName ||
    user?.lastName ||
    user?.fusionAuthUser.fullName ||
    user?.userName ||
    user?.uniqueUsername ||
    "-"
  }!`;
  const views = [
    {
      name: "Analytics",
      tab: <Analytics />,
      title: greetingUser,
      subTitle:
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }) +
        ", " +
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
        }),
    },
    {
      name: "Community",
      tab: <Community />,
      title: greetingUser,
      subTitle:
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }) +
        ", " +
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
        }),
    },
    {
      name: "Dashboard",
      tab: <Dashboard />,
      title: greetingUser,
      subTitle:
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }) +
        ", " +
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
        }),
    },
    {
      name: "Events",
      tab: <Events />,
      title: `${getCurrentMonth("short").toUpperCase()}`,
      subTitle:
        "Here all your planned events. You will find information for each event as well you can planned new one.",
    },
  ];
  return views;
};
