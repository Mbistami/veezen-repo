import React, { useEffect, useState } from "react";
import { SummaryCard, ChartCard } from "@components/Dashboard/Analytics";
import PerformanceChart from "@components/Dashboard/Charts/Preformance";
import Barometer from "../../components/Dashboard/Charts/Barometer";

import ActivityHours from "@components/Dashboard/Charts/ActivityHours";
import { DashCard } from "@components/Dashboard/DashCard";
import PerformanceMood from "../../components/Dashboard/Charts/PreformanceMood";
import { MoodMeter } from "../../components/Dashboard/Charts/MoodMeter";
import Image from "next/image";
import { Typography } from "@mui/material";
import useApi from "@hooks/useApi";

const ChartCardSummary = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <div className="flex flex-col justify-center items-center text-gray-500">
    <p>{title}</p>
    <p className="pt-2 text-xl font-semibold text-gray-900">{value}</p>
  </div>
);
const data_ = [
  {
    date: "2022-06-30T00:00:00",
    value: 0,
  },
  {
    date: "2022-06-29T00:00:00",
    value: 33,
  },
  {
    date: "2022-06-28T00:00:00",
    value: 50,
  },
  {
    date: "2022-06-27T00:00:00",
    value: 33,
  },
  {
    date: "2022-06-26T00:00:00",
    value: 33,
  },
  {
    date: "2022-06-25T00:00:00",
    value: 16,
  },
  {
    date: "2022-06-24T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-23T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-22T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-21T00:00:00",
    value: 66,
  },
  {
    date: "2022-06-20T00:00:00",
    value: 50,
  },
  {
    date: "2022-06-19T00:00:00",
    value: 33,
  },
  {
    date: "2022-06-18T00:00:00",
    value: 0,
  },
  {
    date: "2022-06-17T00:00:00",
    value: 50,
  },
  {
    date: "2022-06-16T00:00:00",
    value: 50,
  },
  {
    date: "2022-06-15T00:00:00",
    value: 16,
  },
  {
    date: "2022-07-05T00:00:00",
    value: 50,
  },
  {
    date: "2022-07-04T00:00:00",
    value: 83,
  },
  {
    date: "2022-07-03T00:00:00",
    value: 33,
  },
  {
    date: "2022-07-02T00:00:00",
    value: 16,
  },
  {
    date: "2022-07-01T00:00:00",
    value: 16,
  },
];
const data__ = [
  {
    date: "2022-06-30T00:00:00",
    value: 0,
  },
  {
    date: "2022-06-29T00:00:00",
    value: 33,
  },
  {
    date: "2022-06-28T00:00:00",
    value: 50,
  },
  {
    date: "2022-06-27T00:00:00",
    value: 33,
  },
  {
    date: "2022-06-26T00:00:00",
    value: 33,
  },
  {
    date: "2022-06-25T00:00:00",
    value: 16,
  },
  {
    date: "2022-06-24T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-23T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-22T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-21T00:00:00",
    value: 66,
  },
  {
    date: "2022-06-20T00:00:00",
    value: 50,
  },
  {
    date: "2022-06-19T00:00:00",
    value: 33,
  },
  {
    date: "2022-06-18T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-17T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-16T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-06-15T00:00:00",
    value: 16,
  },
  {
    date: "2022-07-05T00:00:00",
    value: 50,
  },
  {
    date: "2022-07-04T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-07-03T00:00:00",
    value: Math.round(Math.random() * 100),
  },
  {
    date: "2022-07-02T00:00:00",
    value: 16,
  },
  {
    date: "2022-07-01T00:00:00",
    value: 16,
  },
];

const Analytics = () => {
  const pastXDays = 10;
  const now = new Date();
  const [totalHours, setTotalHours] = useState(0);
  const [totalMeetings, setTotalMeetings] = useState(0);
  const { data, loading } = useApi(
    `https://api.veezen.com/api/v1/event/data/daily?start=${encodeURIComponent(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - pastXDays
      ).toISOString()
    )}`,
    { method: "GET" }
  );
  const { data: moodData, loading: loadingMood } = useApi(
    `https://api.veezen.com/api/v1/survey/analytics/bar?start=2022-06-15T03:06:03.983Z&type=MOOD`,
    { method: "GET" }
  );
  const { data: batteryData, loading: loadingBattery } = useApi(
    `https://api.veezen.com/api/v1/survey/analytics/bar?start=2022-06-15T03:06:03.983Z&type=BATTERY`,
    { method: "GET" }
  );
  const { data: stats, loading: loadingStats } = useApi(
    `https://api.veezen.com/api/v1/survey/answer/count`,
    { method: "GET" }
  );
  useEffect(() => {
    data?.sort((a: { date: string }, b: { date: any }) =>
      a.date.localeCompare(b.date)
    );
    if (!loading && data?.length > 0) {
      let i = 0;
      let total = 0;

      for (i; i < data?.length; i++) {
        total += data?.sort((a: { date: string }, b: { date: any }) =>
          a.date.localeCompare(b.date)
        )[i]?.count;
      }
      console.log(total);
      setTotalHours(total);
    }
  }, [data]);
  return (
    <div className="w-full">
      <div className="flex gap-3 py-12 px-8 w-full xl:flex-col">
        <SummaryCard
          icon={"/dashboard/up-rank.svg"}
          title="Overall Engagement"
          value={stats}
          perUnit="weekly"
        />
        <SummaryCard
          icon={"/dashboard/up-rank.svg"}
          title="Point score"
          value={`${stats * 10}`}
        />
        <SummaryCard
          icon={"/dashboard/up-rank.svg"}
          title="Rank score"
          value={`${stats % 10}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 px-8 mt-1">
        {/* <ChartCard title="Battery barometer">
          <Barometer type="Battery" />
        </ChartCard> */}

        <DashCard title="Mood barometer">
          <Barometer type="MOOD" />
        </DashCard>
        <DashCard title="Mood calendar">
          <MoodMeter />
        </DashCard>
        <ChartCard title="Battery performance">
          {batteryData?.length > 0 ? (
            <PerformanceMood type="BATTERY" data={data__} />
          ) : (
            <div></div>
          )}
        </ChartCard>

        <DashCard title="Mood performance">
          {moodData?.length > 0 ? (
            <PerformanceMood type="MOOD" data={data_} />
          ) : (
            <div></div>
          )}
        </DashCard>
      </div>
    </div>
  );
};

export default Analytics;
