/////////////////////////////////////////////////////////////////////
// This file shall be renamed to DashboardView.tsx later.
/////////////////////////////////////////////////////////////////////
import React, { useState, useReducer } from "react";
import { DashCard } from "@components/Dashboard/DashCard";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Timeline } from "@components/Dashboard/Timeline";
import SimpleImageSlider from "react-simple-image-slider";
import { motion, useMotionValue } from "framer-motion";
import Upcoming from "@components/Dashboard/Upcoming";
import { useUser } from "@hooks/useUser";
import { RequestSession } from "../../components/Dialog/RequestSession";
import { CreateNewPoll } from "../../components/Dialog/CreateNewPoll";
import Poll from "../../components/Dashboard/Poll";

const NotificationsCard = () => (
  <div className="w-full">
    <div className="py-0">
      <a className="flex items-center py-3 px-4 -mx-2 hover:bg-gray-100 border-b">
        <Image
          width={30}
          height={30}
          layout="fixed"
          className="object-cover mx-1 w-8 h-8 rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />
        <p className="mx-2 text-sm text-gray-600">
          <span className="font-bold">Sara Salah</span> replied on the{" "}
          <span className="font-bold text-blue-500">Upload Image</span> artical
          . 2m
        </p>
      </a>
      <a className="flex items-center py-3 px-4 -mx-2 hover:bg-gray-100 border-b">
        <Image
          width={30}
          height={30}
          layout="fixed"
          className="object-cover mx-1 w-8 h-8 rounded-full"
          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          alt="avatar"
        />
        <p className="mx-2 text-sm text-gray-600">
          <span className="font-bold">Slick Net</span> start following you . 45m
        </p>
      </a>
      <a className="flex items-center py-3 px-4 -mx-2 hover:bg-gray-100 border-b">
        <Image
          width={30}
          height={30}
          layout="fixed"
          className="object-cover mx-1 w-8 h-8 rounded-full"
          src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />
        <p className="mx-2 text-sm text-gray-600">
          <span className="font-bold">Jane Doe</span> Like Your reply on{" "}
          <span className="font-bold text-blue-500">Test with TDD</span> artical
          . 1h
        </p>
      </a>
      <a className="flex items-center py-3 px-4 -mx-2 hover:bg-gray-100">
        <Image
          width={30}
          height={30}
          layout="fixed"
          className="object-cover mx-1 w-8 h-8 rounded-full"
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
          alt="avatar"
        />
        <p className="mx-2 text-sm text-gray-600">
          <span className="font-bold">Abigail Bennett</span> start following you
          . 3h
        </p>
      </a>
    </div>
  </div>
);

export const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
};

const Dashboard = () => {
  const usefonrceUpdate = useForceUpdate();
  const images = [
    {
      url: "https://res.cloudinary.com/veezen/image/upload/v1656311243/gjfzd6ppzb5bgasixvxw.jpg",
    },
    {
      url: "https://res.cloudinary.com/veezen/image/upload/v1656311243/gjfzd6ppzb5bgasixvxw.jpg",
    },
    {
      url: "https://res.cloudinary.com/veezen/image/upload/v1656311243/gjfzd6ppzb5bgasixvxw.jpg",
    },
  ];
  const [isHover, setIsHover] = useState(false);
  const usersAllowed = ["Admin", "Coach", "Entreprise_Admin"];
  const height = useMotionValue(250);
  const { roles } = useUser();
  const [open, setOpen] = useState(false);
  const [pollDialog, setPollDialog] = useState(false);
  console.log(roles?.length > 0 ? roles[0] : "");
  return (
    <div className="py-10 w-full">
      <div className="grid grid-cols-2 gap-8 px-8 ">
        <DashCard
          title="Poll"
          buttons={
            usersAllowed.includes(roles?.length > 0 ? roles[0] : "") && [
              { label: "Create poll", handler: () => setPollDialog(true) },
            ]
          }
          lockHeight="overflow-y-hidden max-h-[350px]"
        >
          <Poll />
        </DashCard>
        <DashCard
          title="Upcoming event"
          subtitle="Here you can view your upcoming events."
          lockHeight="max-h-[350px] overflow-y-hidden"
        >
          <Upcoming />
        </DashCard>
        <DashCard
          title="Timeline"
          colSpan={2}
          pChild={0}
          buttons={
            usersAllowed.includes(roles?.length > 0 ? roles[0] : "") && [
              { label: "Create event", handler: () => setOpen(true) },
            ]
          }
        >
          <div className="w-full">
            <Timeline refresh={open} />
          </div>
        </DashCard>
      </div>
      <RequestSession open={open} handleClose={() => setOpen(false)} />
      <CreateNewPoll
        open={pollDialog}
        handleClose={() => setPollDialog(false)}
        onlySucessClose={false}
      />
    </div>
  );
};

export default Dashboard;
