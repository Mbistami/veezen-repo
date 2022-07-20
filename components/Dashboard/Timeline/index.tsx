import React, { useRef, useState } from "react";
import { useCalContext, useAppContext } from "../../../context";
import getDaysInMonth from "date-fns/getDaysInMonth";
import { motion, useMotionValue } from "framer-motion";
import { getDaysInYear } from "date-fns";
import { Typography } from "@mui/material";
import { LinearProgress } from "@material-ui/core";
import useApi from "@hooks/useApi";

export const Timeline = ({ refresh }: { refresh: any }) => {
  function timeSince(date: Date) {
    let seconds: number = Math.floor(
      ((new Date() as any) - (date as any)) / 1000
    );
    if (seconds < 0) seconds *= -1;

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "mo";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;

    if (interval > 1) {
      return Math.floor(interval) + "mi";
    }
    return Math.floor(seconds) + " seconds";
  }
  var aDay = 24 * 60 * 60 * 1000;
  const container = useRef();
  const getDayOfYear_ = (date = new Date()) => {
    const timestamp1 = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);

    const differenceInMilliseconds = timestamp1 - timestamp2;

    const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

    return differenceInDays;
  };
  const [cal] = useCalContext();
  const [date, setDate] = React.useState<Date | null>(cal);
  const [user, setUser] = useAppContext();
  let fLCapital = (s: string) => s.replace(/./, (c: string) => c.toUpperCase());
  const [days, setDays] = React.useState<Array<number> | null>(
    Array.from(Array(getDaysInYear(date))) as Array<number>
  );
  const [currentDate, setCurrentDate] = React.useState<Date | null>(date);
  const ref = React.useRef<HTMLDivElement>(null);
  const [passDate, setPDate] = React.useState<Date | null>(
    new Date(date.getFullYear(), date.getMonth() - 1, 1)
  );
  // const [data, setData] = useState([]);
  const Authorization = user?.Authorization;
  const now = new Date();
  const { data, loading, mutate } = useApi(
    `https://api.veezen.com/api/v1/event/crud/me?start=${encodeURIComponent(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      ).toISOString()
    )}`,
    { method: "GET" }
  );
  const [events, setEvents] = useState(data);
  const x = useMotionValue(0);
  const arr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  React.useEffect(() => {
    setDate(cal);
    setDays(Array.from(Array(getDaysInYear(date) * 2)) as Array<number>);
  }, [cal, setDate, setDays, date]);
  const daysDiff = (date_1: Date, date_2: Date) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    TotalDays++;
    return TotalDays < 0 ? TotalDays * -1 : TotalDays;
  };
  React.useEffect(() => {
    x.set(getDayOfYear_(cal) * 80 * -1 + 80 * 3);
  }, []);
  React.useEffect(() => {
    mutate();
  }, [refresh]);
  React.useEffect(() => {
    if (data?.length > 0) setEvents(data);
  }, [data]);
  return (
    <div className="border-t relative border-gray-200 " ref={container}>
      <motion.div drag="x" className=" h-fit" style={{ x, height: "70vh" }}>
        <div className="flex overflow-visible flex-row w-fit ">
          {months
            .join(" ")
            .repeat(2)
            .split(" ")
            .map((e, i) => {
              return (
                <div
                  className={`p-2 mb-7 before:content-[''] before:w-[1px] before:h-20 before:bg-gray-400 before:absolute before:-left-0.5 relative before:z-50 overflow-visible`}
                  style={{
                    width:
                      getDaysInMonth(
                        new Date(
                          i > 11 ? date.getFullYear() + 1 : date.getFullYear(),
                          i,
                          1
                        )
                      ) * 80,
                  }}
                  key={i}
                >
                  <p className="font-bold">{e}</p>
                </div>
              );
            })}
        </div>

        <div ref={ref} className="flex flex-row h-full relative">
          {days.map((_, i) => {
            const savedDates: Array<{ date: string; count: number }> = [];
            return (
              <div key={i} className="h-full">
                <p
                  className={`text-right text-gray-700 pr-5 text-sm ${
                    getDayOfYear_(cal) - 1 === i && "text-[#057BA3]"
                  }`}
                >
                  {arr[new Date(date.getFullYear(), 0, i + 1)?.getDay()] + " "}
                  {new Date(date.getFullYear(), 0, i + 1)?.toLocaleString(
                    "default",
                    {
                      day: "2-digit",
                    }
                  )}
                </p>
                {events &&
                  events?.map((e: any, k: any) => {
                    if (
                      new Date(e?.startDate).toDateString() ===
                      new Date(date?.getFullYear(), 0, i + 1).toDateString()
                    ) {
                      let index = -1;
                      savedDates.find((element, c) => {
                        if (
                          element?.date ===
                          new Date(e?.startDate).toDateString()
                        )
                          index = c;
                      });
                      if (index > -1) {
                        savedDates[index].count++;
                      } else
                        savedDates.push({
                          date: new Date(e?.startDate).toDateString(),
                          count: 1,
                        });
                      return (
                        <motion.div
                          key={k}
                          className="bg-[#0FB29C] group  absolute z-10 text-black flex flex-row justify-end rounded-lg"
                          style={{
                            minWidth: e?.dailyDuration * 80,
                            left: i * 80,
                            height: 80,
                            top: index > -1 ? savedDates[index].count * 85 : 80,
                          }}
                          initial={{
                            width: e?.dailyDuration * 80,
                          }}
                          whileHover={{
                            width:
                              e?.dailyDuration <= 3
                                ? 80 * 6
                                : e?.dailyDuration * 80 + 160,
                            height: 160,
                            zIndex: 100,
                          }}
                        >
                          <div
                            className="group relative pr-1 h-full bg-white group-hover:bg-slate-100 rounded-lg"
                            style={{
                              width:
                                daysDiff(
                                  new Date(e?.startDate),
                                  new Date(e?.endDate)
                                ) > 1
                                  ? "95%"
                                  : "80%",
                            }}
                          >
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <Typography
                                  fontFamily="Nunito"
                                  className=" px-2 pt-2 font-bold text-xl w-full truncate font-bold m-0"
                                >
                                  {e?.name}
                                </Typography>
                                {e?.description
                                  .split("\n")
                                  .map((e: any, i: any) => (
                                    <Typography
                                      fontFamily="Nunito"
                                      className="px-2 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 duration-300 text-sm w-full m-0"
                                      key={i}
                                    >
                                      {e}
                                    </Typography>
                                  ))}
                              </div>
                              <Typography
                                fontFamily="Nunito"
                                className="text-semibold px-1 text-sm opacity-60"
                              >{`${timeSince(new Date(e?.startDate))} ${
                                new Date(e?.startDate).getTime() >
                                new Date().getTime()
                                  ? "ahead"
                                  : "ago"
                              }`}</Typography>
                            </div>
                            <div
                              className="w-1.5 h-1.5 min-h-3 absolute top-2 right-2 bg-black"
                              style={{
                                backgroundColor: e?.joinable ? "green" : "red",
                                borderRadius: "50%",
                              }}
                            />
                            <div className="flex absolute right-2 bottom-2 flex-row gap-3 justify-end">
                              {e?.status && (
                                <div
                                  className="group flex flex-row bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-5"
                                  style={{
                                    backgroundColor:
                                      e?.status === "PENDING"
                                        ? "#63e13d"
                                        : "red",
                                  }}
                                >
                                  <p className="text-xs px-2 text-white">
                                    {e?.status}
                                  </p>
                                </div>
                              )}
                              {e?.locationType && (
                                <div
                                  className="group flex   flex-row bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-5"
                                  style={{
                                    backgroundColor: e?.joinable
                                      ? "green"
                                      : "#0fb29c",
                                  }}
                                >
                                  <p className="text-xs px-2 text-white">
                                    {e?.locationType}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    }
                  })}

                <motion.div
                  style={{ minWidth: "80px" }}
                  key={i}
                  className={`h-full bg-gray-50 border-r border-gray-400 relative overflow-visible ${
                    getDayOfYear_(cal) - 1 === i
                      ? "border-[#057BA3] border-r-4"
                      : ""
                  }`}
                >
                  {getDayOfYear_(cal) - 1 === i && (
                    <div
                      className="absolute w-3 h-3 bg-[#057BA3] rounded-full z-10"
                      style={{ right: "-8px", top: "-8px" }}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
      {loading && (
        <div className="absolute w-full top-0">
          <LinearProgress />
        </div>
      )}
    </div>
  );
};
export default Timeline;
