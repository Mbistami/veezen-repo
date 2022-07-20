import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import useIsSSR from "@hooks/useIsSSR";
import { useAppContext } from "context";
import useApi from "@hooks/useApi";
import { LinearProgress } from "@mui/material";

const data = [
  {
    Time: "Jan",
    count: 45,
  },
  {
    Time: "Feb",
    count: 65,
  },
  { Time: "Mar", count: 60 },
  { Time: "Apr", count: 43 },
  { Time: "May", count: 55 },
];

const PerformanceChart = () => {
  const isSSR = useIsSSR();
  const [user] = useAppContext();
  const Authorization = user?.Authorization;
  const now = new Date();
  // const { data, loading } = useApi(
  //   `https://api.veezen.com/api/v1/event/data/monthly/activeHours?start=${encodeURIComponent(
  //     new Date(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate() - 7
  //     ).toISOString()
  //   )}`,
  //   { method: "GET" }
  // );

  if (isSSR) {
    return (
      <div className="relative w-full min-w-[200px] min-h-[300px] ">
        <LinearProgress className="" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="90%" height={300} className="pr-3">
      <LineChart
        data={
          data
          // data?.length > 0 &&
          // data?.sort((a: { date: string }, b: { date: any }) =>
          //   a.date.localeCompare(b.date)
          // )
        }
      >
        <XAxis
          dataKey={"month"}
          stroke="#a1a1a1"
          name="Time"
          style={{
            marginTop: "10px",
            fontSize: "14px",
            fontFamily: "Nunito ",
          }}
        />
        <YAxis />

        <CartesianGrid stroke="#eee" horizontal={false} strokeWidth={1} />
        <Line type="monotone" dataKey="count" stroke="#0A9FA8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
