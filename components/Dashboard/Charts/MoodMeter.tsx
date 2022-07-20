import React from "react";
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
import Image from "next/image";
import Confident from "../../assets/moods/confident.svg";
import Motivated from "../../assets/moods/motivated.svg";
import Proud from "../../assets/moods/proud.svg";
import Happy from "../../assets/moods/happy.svg";
import Stressed from "../../assets/moods/stressed.svg";
import Demotivated from "../../../assets/moods/demotivated.svg";
import Angry from "../../assets/moods/angry.svg";
import VeryAngry from "../../../assets/moods/veryAngry.svg";
import Reconnaissant from "../../../assets/moods/reconnaissant.svg";
import Relieved from "../../../assets/moods/relieved.svg";
import Anoyed from "../../../assets/moods/annoyed.svg";
import Tired from "../../../assets/moods/tired.svg";

export const MoodMeter = () => {
  const moods = [
    <Image src={Tired} alt="Tired" width={34} height={34} key={1} />,
    <Image src={Reconnaissant} alt="Tired" width={34} height={34} key={1} />,
    <Image src={Anoyed} alt="Tired" width={34} height={34} key={1} />,
    <Image src={Relieved} alt="Tired" width={34} height={34} key={1} />,
    <Image src={Demotivated} alt="Tired" width={34} height={34} key={1} />,
    <Image src={VeryAngry} alt="Tired" width={34} height={34} key={1} />,
  ];
  const months = [
    {
      date: "January",
      emojis: [1, 2, 1, 2, 5, 2, 1, 2, 5, 2],
    },
    {
      date: "February",
      emojis: [5, 2, 1, 2, 5, 2, 1, 2, 5, 2, 1, 2],
    },
    {
      date: "March",
      emojis: [2, 1, 2, 5, 1, 2, 5, 2, 1, 2, 5, 5, 2],
    },
    { date: "April", emojis: [2, 1, 2, 5, 1, 2, 5, 2, 1, 2, 5, 5, 2] },
    { date: "May", emojis: [1, 2, 5, 2, 2, 1, 2, 5, 2, 5, , 2] },
    { date: "June", emojis: [1, 2, 5, 2, 1, 2, 5, 3, 1, 2, 5, 2, 1, 2] },
    { date: "July", emojis: [1, 2, 5, 2, 5, 3, 1, 2, 5, 2] },
    // {
    //   date: "August",
    //   emojis: [3, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2],
    // },
    // {
    //   date: "September",
    //   emojis: [3, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2],
    // },
    // {
    //   date: "October",
    //   emojis: [1, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2],
    // },
    // {
    //   date: "November",
    //   emojis: [4, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2],
    // },
    // {
    //   date: "December",
    //   emojis: [1, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2, 1, 2, 5, 2],
    // },
  ];
  const data = [
    {
      date: new Date(),
      emojis: [1, 2],
    },
    {
      date: new Date(),
      emojis: [1, 3],
    },
    {
      date: new Date(),
      emojis: [1, 4],
    },
  ];
  return (
    <div className="w-full">
      {months?.map((e, k) => {
        return (
          <div key={k} className="flex flex-row gap-2 border-t">
            <div className="min-w-[100px] items-center flex flex-row px-3">
              <p>{e?.date}</p>
            </div>
            <div className="flex flex-row min-w-[100px] h-10 items-center gap-1">
              {e?.emojis
                .sort((a, b) => a - b)
                .map((c, i) => (
                  <div key={i}>{moods[c]}</div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MoodMeter;
