import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useIsSSR from "@hooks/useIsSSR";
import useApi from "@hooks/useApi";
import { LinearProgress } from "@mui/material";

export default function ActivityHours() {
  const isSSR = useIsSSR();
  const now = new Date();
  const pastXDays = 3;
  const { data, loading } = useApi(
    `https://api.veezen.com/api/v1/event/data/daily?start=${encodeURIComponent(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - pastXDays
      ).toISOString()
    )}&end=${encodeURIComponent(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 7
      ).toISOString()
    )}`,
    { method: "GET" }
  );

  if (isSSR || loading) {
    return (
      <div className="relative w-full min-w-[200px] min-h-[300px] ">
        <LinearProgress className="" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={
          !loading &&
          data?.sort((a: { date: string }, b: { date: any }) =>
            a.date.localeCompare(b.date)
          )
        }
        // margin={{
        //   top: 0,
        //   right: 0,
        //   left: 0,
        //   bottom: 0,
        // }}
      >
        <CartesianGrid stroke="#eee" vertical={false} strokeWidth={1} />
        <XAxis
          dataKey="day"
          stroke="#a1a1a1"
          name="Time"
          style={{
            marginTop: "10px",
            fontSize: "14px",
            fontFamily: "Nunito ",
          }}
          allowDataOverflow
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="#a1a1a1"
          //dataKey as half hour
          // tickFormatter={(value) => {
          //   //floor to half hours starting from minFrom
          //   const halfHour = Math.floor((value - minFrom) / 0.5);
          //   const hour = Math.floor(halfHour / 2);
          //   const minute = halfHour % 2 === 0 ? "00" : "30";
          //   return `0${hour}:${minute}`;
          // }}
        />
        <Tooltip />
        <Bar
          yAxisId="left"
          dataKey="count"
          style={{
            fill: "#0A9FA8",
            stroke: "#0A9FA8",
            strokeWidth: 1,
            strokeOpacity: 1,
          }}
          radius={[100, 100, 100, 100]}
          barSize={2}
          name="Hours"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
