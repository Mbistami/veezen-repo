import useApi from "@hooks/useApi";
import React, { useState } from "react";
import { CheckCircle, Router } from "@mui/icons-material";
import { useAppContext } from "context";
import { Box, LinearProgress, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import Barometer from "../Charts/Barometer";
import PerformanceMood from "../Charts/PreformanceMood";

export const Poll = () => {
  const { data, loading, mutate } = useApi(
    `https://api.veezen.com/api/v1/survey/poll/last`,
    { method: "GET" }
  );
  const router = useRouter();
  const [poll, setPoll] = useState(null);
  const [loading_, setLoading] = useState(false);
  React.useEffect(() => {
    if (data) setPoll(data);
  }, [data]);
  const user = useAppContext();
  const Authorization = user[0]?.Authorization;
  const handleNewVote = (selectedId: any) => {
    setLoading(true);
    fetch(
      `https://api.veezen.com/api/v1/survey/poll/vote/${poll?.id}/${selectedId}`,
      { method: "POST", headers: { Authorization } }
    )
      .then((res) => {
        if (res.status === 200) mutate();
        else if (res.status === 401) router.push("/login");
        setLoading(false);
      })
      .catch((E) => setLoading(false));
  };
  return (
    <div className="px-6">
      {loading_ && <LinearProgress />}
      <p className="font-primary text-base font-semibold text-gray-700 mt-2">
        {poll?.name ? poll?.name : ""}
      </p>
      <div
        className={`flex gap-1 justify-between flex-col max-h-[230px] mt-2 ${
          poll?.options.length > 4 ? "overflow-y-scroll" : ""
        } pr-2`}
      >
        {poll?.options
          .sort((a: any, b: any) => a.pos - b.pos)
          .map((e: any, i: number) => {
            console.log(e?.isSelected);
            return (
              <div
                className="py-2"
                key={i}
                onClick={() => handleNewVote(e?.id)}
              >
                <div className="w-full h-6 bg-white rounded-md relative">
                  <div
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className="flex justify-start h-10 bg-[#d9d9d9] flex-roo align-center rounded-md"
                    style={{
                      width: `${
                        e?.percentage !== "NaN" ? e?.percentage : "0"
                      }%`,
                      height: "100%",
                    }}
                  >
                    <div className="flex flex-row items-center gap-1">
                      <p className="h-full whitespace-nowrap	 font-bold ml-2 text-[#7d7d7d]">
                        {e?.description}
                      </p>
                      <Box sx={{ width: "15px" }} className="items-center">
                        {e?.isSelected && (
                          <CheckCircle
                            className="text-[#7d7d7d]"
                            fontSize="inherit"
                          />
                        )}
                      </Box>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 font-semibold">
                    <p>
                      {Number(e?.percentage).toFixed(2) !== "NaN"
                        ? `${Number(e?.percentage).toFixed(2)}%`
                        : "0%"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex felx-row justify-center items-center h-full">
        {poll === null && <CircularProgress />}
      </div>
    </div>
  );
};
export default Poll;
