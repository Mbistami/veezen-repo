import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { MenuOutlined, InboxOutlined, InfoOutlined } from "@mui/icons-material";

interface Props {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  //array of components
  navActions?: React.ReactNode[];
  showProfile?: boolean;
  setShowProfile?: any;
}

function DashboardView(props: Props) {
  //get navButtons as components
  const navActions = props.navActions ? props.navActions : [];
  const style = { width: 30, height: 30 };
  return (
    <div className="flex flex-col w-full md:w-1/3">
      <div className="flex justify-between px-10 pt-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="  font-primary text-4xl font-bold tracking-wide leading-10 text-gray-800">
            {props.title}
            <p className="text-sm  font-normal tracking-normal text-gray-500">
              {props.subTitle}
            </p>
          </h1>
        </motion.div>
        <ul className="flex gap-x-6">
          <li>
            {/* <Image
              className="hover:opacity-75 cursor-pointer"
              src="/dashboard/info-settings-icon.svg"
              width={30}
              height={30}
              alt="info"
              layout="fixed"
            /> */}
            <InfoOutlined
              className="hover:opacity-75 cursor-pointer opacity-60"
              sx={{ style }}
            />
          </li>
          <li>
            {/* <Image
              className="hover:opacity-75 cursor-pointer"
              src="/dashboard/inbox-icon.svg"
              width={30}
              height={30}
              alt="inbox"
              layout="fixed"
            /> */}
            <InboxOutlined
              className="hover:opacity-75 cursor-pointer opacity-60"
              sx={{ style }}
            />
          </li>
          <li>
            {/* <Image
              className="hover:opacity-75 cursor-pointer"
              src="/dashboard/inbox-icon.svg"
              width={30}
              height={30}
              alt="inbox"
              layout="fixed"
              onClick={() => {
                console.log(props);
                if (props?.setShowProfile) {
                  console.log(props.showProfile);
                  props?.setShowProfile(!props?.showProfile);
                }
                console.log("TEST", props?.showProfile);
              }}
            /> */}
            <MenuOutlined
              className="hover:opacity-75 cursor-pointer opacity-60"
              onClick={() => {
                console.log(props);
                if (props?.setShowProfile) {
                  console.log(props.showProfile);
                  props?.setShowProfile(!props?.showProfile);
                }
                console.log("TEST", props?.showProfile);
              }}
              sx={style}
            />
          </li>
        </ul>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default DashboardView;
