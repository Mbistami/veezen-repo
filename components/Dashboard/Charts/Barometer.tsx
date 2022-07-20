import React, { useState } from "react";
import {
  Battery0Bar,
  Battery1Bar,
  Battery2Bar,
  Battery3Bar,
  Battery4Bar,
  Battery5Bar,
  Battery6Bar,
  MoodBad,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import useApi from "@hooks/useApi";

export const Barometer = ({ type }: { type: any }) => {
  const { data, loading } = useApi(
    `https://api.veezen.com/api/v1/survey/analytics/average?start=${new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    ).toISOString()}&type=MOOD`
  );
  const logos = {
    0: <SentimentSatisfied />,
    1: <SentimentDissatisfied />,
  };
  const [moods, setMoods] = useState([]);
  // const moods = [
  //   {
  //     mood: <SentimentSatisfied />,
  //     data: data[0]?.data,
  //     color: "#8ab8b3",
  //   },
  //   {
  //     mood: <SentimentDissatisfied />,
  //     data: data[1]?.data,
  //     color: "#74acf5",
  //   },
  //   {
  //     mood: <SentimentVeryDissatisfied />,
  //     data: data[2]?.data,
  //     color: "#d9c890",
  //   },
  //   { mood: <MoodBad />, data: data[3]?.data, color: "#d8b29b" },
  // ];
  React.useEffect(() => {
    if (data?.length > 0 && moods?.length === 0)
      setMoods([
        {
          mood: type === "MOOD" ? <SentimentSatisfied /> : <Battery6Bar />,
          data: data[0]?.questions,
          color: "#8ab8b3",
        },
        {
          mood: type === "MOOD" ? <SentimentDissatisfied /> : <Battery5Bar />,
          data: data[1]?.data,
          color: "#74acf5",
        },
        {
          mood:
            type === "MOOD" ? <SentimentVeryDissatisfied /> : <Battery4Bar />,
          data: data[2]?.data,
          color: "#d9c890",
        },
        {
          mood: type === "MOOD" ? <MoodBad /> : <Battery3Bar />,
          data: data[3]?.data,
          color: "#d8b29b",
        },
      ]);
  }, [data]);
  console.log(data);
  return (
    <div className="flex flex-col">
      {moods.map((e: any, i: number) => {
        return (
          <div className="flex flex-row w-full h-14 border-t" key={i}>
            <div
              style={{ width: "8%", color: e?.color }}
              className="flex flex-row justify-center items-center h-full border-r"
            >
              {React.cloneElement(e?.mood, { fontSize: "large" })}
            </div>
            <div
              style={{ width: "92%" }}
              className="flex  flex-row gap-1 items-center h-full"
            >
              {e?.data?.map((v: any, i: any) => (
                <Tooltip key={i} title={v?.value}>
                  <div className="flex flex-row justify-center min-w-[40px]">
                    <div
                      className={`w-${v?.value} h-${v?.value} rounded-full `}
                      style={{ backgroundColor: e?.color }}
                      key={i}
                    />
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Barometer;
