import React, { useState } from "react";
import {
  Battery0Bar,
  Battery1Bar,
  Battery2Bar,
  Battery3Bar,
  Battery4Bar,
  Battery5Bar,
  Battery6Bar,
  BatteryFull,
  MoodBad,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
  RadioButtonUnchecked,
  ArrowCircleRight,
} from "@mui/icons-material";
import {
  Stack,
  Box,
  Dialog,
  Typography,
  IconButton,
  Button,
  Slider,
  TextField,
  Paper,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import Confident from "../../assets/moods/confident.svg";
import Motivated from "../../assets/moods/motivated.svg";
import Proud from "../../assets/moods/proud.svg";
import Happy from "../../assets/moods/happy.svg";
import Stressed from "../../assets/moods/stressed.svg";
import Demotivated from "../../assets/moods/demotivated.svg";
import Angry from "../../assets/moods/angry.svg";
import VeryAngry from "../../assets/moods/veryAngry.svg";
import Reconnaissant from "../../assets/moods/reconnaissant.svg";
import Relieved from "../../assets/moods/relieved.svg";
import Anoyed from "../../assets/moods/annoyed.svg";
import LogoWithoutText from "../../assets/logoVeezen.png";
import LogoText from "../../assets/VeezenText.png";
import Tired from "../../assets/moods/tired.svg";
import { useUser } from "@hooks/useUser";
import Image from "next/image";

export const Mood = ({ open, setOpen, type, questions }) => {
  const { Authorization } = useUser();
  const [currentQuestions, setCurrentQuestion] = useState(
    questions?.length > 0 ? questions[0]?.type : ""
  );
  const [selectedId, setSelectedId] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [text, setText] = useState("");
  const batteries = [
    { icon: <Battery1Bar key={1} />, label: 1 },
    { icon: <Battery2Bar key={1} />, label: 2 },
    { icon: <Battery3Bar key={1} />, label: 3 },
    { icon: <Battery4Bar key={1} />, label: 4 },
    { icon: <Battery5Bar key={1} />, label: 5 },
    { icon: <BatteryFull key={1} />, label: 5 },
  ];
  const moods = [
    { icon: <MoodBad key={1} />, label: 1 },
    { icon: <SentimentVeryDissatisfied key={1} />, label: 1 },
    { icon: <SentimentDissatisfied key={1} />, label: 1 },
    { icon: <SentimentNeutral key={1} />, label: 1 },
    { icon: <SentimentSatisfied key={1} />, label: 1 },
    { icon: <SentimentSatisfiedAlt key={1} />, label: 1 },
    { icon: <SentimentVerySatisfied key={1} />, label: 1 },
  ];
  const regular = [
    { icon: <RadioButtonUnchecked key={1} />, label: 1 },
    { icon: <RadioButtonUnchecked key={2} />, label: 2 },
    { icon: <RadioButtonUnchecked key={3} />, label: 3 },
    { icon: <RadioButtonUnchecked key={4} />, label: 4 },
    { icon: <RadioButtonUnchecked key={5} />, label: 5 },
    { icon: <RadioButtonUnchecked key={6} />, label: 6 },
  ];
  const esprit = [
    {
      icon: (
        <Image src={Confident} alt="confident" width={64} height={64} key={1} />
      ),
      label: "Confiant",
    },
    {
      icon: (
        <Image src={Motivated} alt="Motivated" width={64} height={64} key={1} />
      ),
      label: "Motive",
    },
    {
      icon: <Image src={Proud} alt="Proud" width={64} height={64} key={1} />,
      label: "Fier",
    },
    {
      icon: <Image src={Happy} alt="happy" width={64} height={64} key={1} />,
      label: "Heureux",
    },
    {
      icon: (
        <Image src={Stressed} alt="Stressed" width={64} height={64} key={1} />
      ),
      label: "Stresse",
    },
    {
      icon: (
        <Image
          src={Demotivated}
          alt="Demotivated"
          width={64}
          height={64}
          key={1}
        />
      ),
      label: "Demotive",
    },
    {
      icon: <Image src={Angry} alt="Angry" width={64} height={64} key={1} />,
      label: "Irrite",
    },
    {
      icon: (
        <Image src={VeryAngry} alt="VeryAngry" width={64} height={64} key={1} />
      ),
      label: "En colere",
    },
    {
      icon: (
        <Image
          src={Reconnaissant}
          alt="Reconnaissant"
          width={64}
          height={64}
          key={1}
        />
      ),
      label: "Reconnaissant",
    },
    {
      icon: (
        <Image src={Relieved} alt="Relieved" width={64} height={64} key={1} />
      ),
      label: "Soulage",
    },
    {
      icon: <Image src={Anoyed} alt="Anoyed" width={64} height={64} key={1} />,
      label: "Embete",
    },
    {
      icon: <Image src={Tired} alt="Tired" width={64} height={64} key={1} />,
      label: "Tired",
    },
  ];
  const questions_dictionary = {
    MOOD: ["How was your mood!", moods],
    BATTERY: ["How was your energy today?!", batteries],
    ESPRIT: ["Mon etat d'esprit du jour", esprit],
    REGULAR: ["REGULAR", regular],
  };
  const handleShowing = (e, i) => {
    console.log(currentQuestions);
    if (currentQuestions === "ESPRIT" || currentQuestions === "REGULAR") {
      return (
        <div
          key={i}
          className="flex flex-col gap-0"
          onClick={() => {
            setSelectedOption(i);
            handleContinue(i);
          }}
        >
          {React.cloneElement(e?.icon, {
            key: i,
            fontSize: "large",
            className: `cursor-pointer hover:opacity-70 transition-all ${
              selectedOption === i ? "opacity-80" : ""
            }`,
          })}
          <p className="text-center font-primary text-sm">{e?.label}</p>
        </div>
      );
    } else
      return (
        <IconButton
          onClick={() => {
            console.log("option clicked" + i);
            setSelectedOption(i);
            handleContinue(i);
          }}
        >
          {React.cloneElement(e, {
            key: i,
            fontSize: "large",
            className: "cursor-pointer hover:opacity-70 transition-all",
          })}
        </IconButton>
      );
  };
  const [moodLabel, setMoodLabel] = useState("🙂");
  const handleContinue = (choice) => {
    fetch(`https://api.veezen.com/api/v1/survey/answer`, {
      method: "POST",
      headers: { Authorization, "Content-Type": "application/json" },
      body: JSON.stringify({
        vote: choice,
        questionId: questions[selectedId]["id"],
        message: "",
      }),
    })
      .then((res) => console.log(res))
      .catch(() => {});
    if (selectedId <= questions.length - 1) {
      // questions_dictionary[currentQuestions.toUpperCase()][0];
      if (selectedId + 1 <= questions.length - 1) {
        if (questions[selectedId + 1]["type"] !== "TEXT")
          setCurrentQuestion(questions[selectedId + 1]["type"]);
        else if (selectedId + 2 <= questions.length - 1)
          setCurrentQuestion(questions[selectedId + 2]["type"]);
        setSelectedId(selectedId + 1);
      }
      if (selectedId === questions.length - 1) setCurrentQuestion("MESSAGE");
    } else console.log("SUBMIT END OF PROCESS");
  };
  const handleTextSubmit = () => {
    const id = questions?.find(
      (e) => e.type === "1444f8a5-a632-466e-9fe7-e58342d12757"
    );
    fetch(`https://api.veezen.com/api/v1/survey/answer`, {
      method: "POST",
      headers: { Authorization, "Content-Type": "application/json" },
      body: JSON.stringify({
        vote: 0,
        questionId: "1444f8a5-a632-466e-9fe7-e58342d12757",
        message: text,
      }),
    })
      .then((res) => console.log(res))
      .catch(() => {});
  };
  const getLabelValue = (value) => {
    const emojis = {};
    console.log(
      questions_dictionary[questions[selectedId]["type"]][1][value - 1],
      value - 1
    );
    return React.cloneElement(
      questions_dictionary["BATTERY"][1][value - 1]?.icon,
      { className: "text-red", style: { color: "#0092b1" } }
    );
  };
  console.log(questions);
  const CustomSlider = withStyles({
    root: {
      color: "#0092b1",
    },
    track: {},
    thumb: {
      backgroundColor: "#0096b5",
    },
    valueLabel: {
      backgroundColor: "transparent",
      position: "absolute",
    },
  })(Slider);
  return (
    <Dialog
      className="overflow-hidden"
      open={open}
      onClose={() => setOpen(false)}
      scroll="paper"
    >
      <Box
        style={{
          borderRadius: "50px",
          minWidth: "350px",
          minHeight: "530px",
          maxWidth: "450px",
          maxHeight: "550px",
          overflow: "hidden",
        }}
        className="py-4 px-6 rounded-t-lg overflow-hidden w-full h-full"
      >
        {currentQuestions != "MESSAGE" && (
          <div
            className="flex flex-col overflow-hidden h-full py-2 px-3"
            style={{ height: "500px" }}
          >
            <div
              className="flex flex-col absolute top-14  items-center"
              style={{
                zIndex: 0,
                opacity: 0.05,
                bottom: 0,
                right: 0,
              }}
            >
              <Image
                src={LogoWithoutText}
                className="absolute bottom-0 -right-10"
                width={600}
                height={450}
              />
            </div>
            <div
              className="flex flex-col absolute items-center"
              style={{
                zIndex: 0,
                top: 0,
                left: -20,
              }}
            >
              <Image
                src={LogoWithoutText}
                className="absolute bottom-0 -left-10"
                width={150}
                height={100}
              />
            </div>
            {/* <div className="text-center">
              <div
                className="flex flex-row justify-center items-center relative"
                style={{ paddingBottom: "135px" }}
              ></div>
            </div> */}
            <div
              className="flex flex-col justify-between w-full h-full gap-12 z-40"
              style={{ height: "100%" }}
            >
              {/* <div
                className={`flex flex-row w-full gap-1 px-10 pt-10 justify-center pb-3 ${
                  currentQuestions === "ESPRIT" ? "max-w-[300px]" : ""
                } flex-wrap`}
              >
                {/* {questions_dictionary[currentQuestions.toUpperCase()][1].map(
                  handleShowing
                )} */}
              {/* </div> */}
              <Typography
                className="text-center font-primary font-bold pt-28"
                variant="h5"
              >
                {questions[selectedId]["text"]}
              </Typography>
              <div className="flex flex-col justify-center gap-3 pb-24">
                <div className="text-center">
                  <CustomSlider
                    key={`slider-${questions[selectedId]["text"]}`}
                    aria-valuetext="text"
                    className="w-full"
                    defaultValue={Math.round(
                      questions[selectedId]["numberOfAnswers"] / 2
                    )}
                    step={1}
                    getAriaValueText={getLabelValue}
                    valueLabelFormat={getLabelValue}
                    // components={valueLabelDisplay: {}}
                    valueLabelDisplay="on"
                    min={1}
                    max={questions[selectedId]["numberOfAnswers"]}
                    marks
                  />
                  <Typography className="m-0 font-primary text-sm font-light">
                    Utilisez le slider pour vous exprimez
                  </Typography>
                </div>
                <Button
                  className="px-8"
                  size="medium"
                  onClick={() => {
                    setSelectedOption(selectedId);
                    handleContinue(selectedId);
                  }}
                  endIcon={<ArrowCircleRight fontSize="small" />}
                  sx={{ color: "#0092b1" }}
                >
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        )}
        {currentQuestions === "MESSAGE" && (
          <div className="w-full">
            <Typography
              className="text-center font-primary pb-4 font-bold"
              variant="h5"
            >
              Comment vous sentez vous au boulot?
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="Exprimez-vous!"
              multiline
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex flex-row justify-center mt-3">
              <Button onClick={handleTextSubmit}>Submit</Button>
            </div>
          </div>
        )}
      </Box>
    </Dialog>
  );
};
export default Mood;
