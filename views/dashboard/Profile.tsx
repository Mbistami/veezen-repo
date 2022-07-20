import React from "react";
import Image from "next/image";
import StaticDatePickerLandscape from "@components/Dashboard/Calendars/ProfileCalendar";
import { Avatar } from "@mui/material";

interface ProfileProps {
  name: string;
  username: string;
  rank: number;
  avActivity: string;
  favTheme: string;
  avatar?: string;
}

const Profile = ({
  name,
  username,
  rank,
  avActivity,
  favTheme,
  avatar,
}: ProfileProps) => {
  return (
    <div className="flex flex-col gap-y-4 w-full min-w-[300px] h-full bg-[#F8F8F8]">
      <div className="flex justify-between items-center p-4">
        <h1 className="font-primary text-2xl font-bold text-gray-900">
          Profile
        </h1>
        <button className="py-2 px-8 text-lg bg-[#E0E0E0] hover:bg-[#D8D8D8] rounded-lg hover:shadow-md">
          Edit
        </button>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          className="object-cover w-full h-full cursor-pointer"
          src={avatar || "/dashboard/profile-placeholder.png"}
          alt="profile"
          style={{ width: 140, height: 140 }}
        />

        <p className="flex flex-col items-center py-3">
          <span className="font-primary text-xl font-bold text-gray-900">
            {name}
          </span>
          <span className="font-primary text-sm font-light text-gray-500 hover:opacity-80 cursor-pointer">
            @{username}
          </span>
        </p>
      </div>
      {/* <ul className="grid grid-cols-3 gap-x-3 justify-center self-center py-4 px-8 w-full max-w-max font-primary bg-[#E0E0E0] rounded-3xl  border ">
        <li>
          <p className="min-w-max font-light text-center text-gray-500 cursor-default">
            Rank
          </p>
          <p className="min-w-max text-xl font-bold text-center">{rank}</p>
        </li>
        <li>
          <p className="min-w-max font-light text-center text-gray-500 cursor-default">
            Av. Activity
          </p>
          <p className="min-w-max text-xl font-bold text-center">
            {avActivity}
          </p>
        </li>
        <li>
          <p className="min-w-max font-light text-center text-gray-500 cursor-default">
            Fav. Theme
          </p>

          <p className="min-w-max text-xl font-bold text-center">{favTheme}</p>
        </li>
      </ul> */}
      <div className="p-8">
        <h1 className="py-4 font-primary text-2xl font-bold text-gray-900">
          Calendar
        </h1>
        <StaticDatePickerLandscape />
      </div>
    </div>
  );
};

export default Profile;
