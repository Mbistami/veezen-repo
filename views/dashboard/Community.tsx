/////////////////////////////////////////////////////////////////////
// This file shall be renamed to DashboardView.tsx later.
/////////////////////////////////////////////////////////////////////

import React from "react";
import { DashCard } from "@components/Dashboard/DashCard";
import Image from "next/image";
import UsersListTest from "./UsersListTest";

const Dashboard = () => {
  return (
    <div className="py-10 w-full">
      <div className=" gap-8 px-8 ">
        <UsersListTest />
      </div>
    </div>
  );
};

export default Dashboard;
