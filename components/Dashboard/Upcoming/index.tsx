import React, { useState } from "react";
import { motion } from "framer-motion";
import SimpleImageSlider from "react-simple-image-slider";
import { Typography } from "@mui/material";
import useApi from "@hooks/useApi";
import { timeSince } from "../../../utils";
import { Timelapse, Group, AccessTime } from "@mui/icons-material";

export const Upcoming = () => {
  const { data, loading } = useApi(
    `https://api.veezen.com/api/v1/event/crud/getClosest`,
    { method: "GET" }
  );
  const [closest, setClosest] = useState(null);
  React.useEffect(() => {
    if (data?.length > 0) setClosest(data[0]);
  }, [data]);
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

  return (
    <div className="group relative w-full h-full">
      <motion.div
        className="relative transition-all"
        style={{ height: "350px" }}
        // onHoverStart={() => {
        //   setIsHover(true);
        //   height.set(380);
        // }}
        // onHoverEnd={() => {
        //   setIsHover(false);
        //   height.set(200);
        // }}
      >
        <SimpleImageSlider
          width="100%"
          height={260}
          images={images}
          showBullets={true}
          showNavs={true}
          navSize={25}
          autoPlay
        />
        <motion.div
          className="flex absolute top-0 flex-row justify-between px-4 w-full h-0 group-hover:h-fit bg-[#0fb29c] opacity-0 group-hover:opacity-100 transition-all"
          style={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Typography
            className="font-primary font-bold text-center text-white"
            variant="subtitle1"
          >
            {closest?.name ? closest?.name : "-"}
          </Typography>
          <div className="flex flex-row gap-1 justify-center items-center text-white">
            <Group />
            <Typography
              className="text-center font-primary text-white"
              variant="subtitle1"
            >
              {closest?.attendeesIds ? `${closest?.attendeesIds.length}` : "-"}
            </Typography>
          </div>
          <div className="flex flex-row gap-1 text-white justify-center items-center">
            <Timelapse />
            <Typography
              className="text-left font-primary text-white"
              variant="subtitle1"
            >
              {closest?.startDate
                ? `In ${timeSince(new Date(closest?.startDate))}`
                : "-"}
            </Typography>
          </div>
          <div className="flex flex-row gap-1 text-white justify-center items-center">
            <AccessTime />
            <Typography
              className="text-center font-primary text-white"
              variant="subtitle1"
            >
              {closest?.duration ? `${closest?.duration} hour(s)` : "-"}
            </Typography>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default Upcoming;
