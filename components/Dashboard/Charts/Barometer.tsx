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
import {
  Tooltip,
  Dialog,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import useApi from "@hooks/useApi";

export const Barometer = ({ type }: { type: any }) => {
  const { data, loading } = useApi(
    // `https://api.veezen.com/api/v1/survey/analytics/average?start=${new Date(
    //   new Date().getFullYear(),
    //   new Date().getMonth() - 1,
    //   new Date().getDate()
    // ).toISOString()}&type=MOOD`
    `${process.env.API_SESSION_LINK}/graph_data`,
    { method: "GET" }
  );
  // const { data: chosenUsers, loading: landingUsers } = useApi(
  //   // `https://api.veezen.com/api/v1/survey/analytics/average?start=${new Date(
  //   //   new Date().getFullYear(),
  //   //   new Date().getMonth() - 1,
  //   //   new Date().getDate()
  //   // ).toISOString()}&type=MOOD`
  //   `http://localhost:3000/extract`,
  //   { method: "GET" }
  // );
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
  const moods_ = [
    { icon: <MoodBad key={1} />, label: 1 },
    { icon: <SentimentVeryDissatisfied key={1} />, label: 1 },
    { icon: <SentimentDissatisfied key={1} />, label: 1 },
    { icon: <SentimentNeutral key={1} />, label: 1 },
    { icon: <SentimentSatisfied key={1} />, label: 1 },
    { icon: <SentimentSatisfiedAlt key={1} />, label: 1 },
    { icon: <SentimentVerySatisfied key={1} />, label: 1 },
  ];
  const checkOccurrence = (array: any, element: any) => {
    let counter: number = 0;
    for (var item of array.flat()) {
      if (item == element) {
        counter++;
      }
    }
    return counter;
    console.log(counter);
  };
  React.useEffect(() => {
    if (data?.length > 0 && moods?.length === 0) {
      console.log(data[0].data);
      setMoods([
        {
          mood: type === "MOOD" ? <SentimentSatisfied /> : <Battery6Bar />,
          data,
          color: "#8ab8b3",
        },
        {
          mood: type === "MOOD" ? <SentimentDissatisfied /> : <Battery5Bar />,
          data,
          color: "#74acf5",
        },
        {
          mood:
            type === "MOOD" ? <SentimentVeryDissatisfied /> : <Battery4Bar />,
          data,
          color: "#d9c890",
        },
        {
          mood: type === "MOOD" ? <MoodBad /> : <Battery3Bar />,
          data,
          color: "#d8b29b",
        },
      ]);
    }
    console.log(usersVotes, toShow);
  }, [data]);
  console.log(data);
  const [openDialog, setOpenDialog] = useState(false);
  const [toShow, setToShow] = useState([]);
  const [usersVotes, setUsersVotes] = useState([]);
  const handleClick = async (date: string, type: number) => {
    await fetch(
      `${process.env.API_SESSION_LINK}/extract?date=${date}&type=${type}`,
      {
        method: "GET",
      }
    ).then(
      (res) =>
        res.status === 200 &&
        res.json().then(async (data_) => {
          setUsersVotes(data_);
          console.log(data_);
          const userIds: any = [];
          for await (const doc of data_) {
            console.log(doc);
            userIds.push(doc.ownerId);
          }
          console.log(userIds);
          fetch(`${process.env.API_SESSION_LINK}/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userIds }),
          }).then(
            (res) =>
              res.status === 200 &&
              res.json().then((_data) => {
                setToShow(_data);
                console.log(_data);
              })
          );
        })
    );
    setOpenDialog(true);
  };
  return (
    <div className="flex flex-col">
      {!loading &&
        moods.map((e: any, k: number) => {
          return (
            <div className="flex flex-row w-full h-14 border-t" key={k}>
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
                  <Tooltip
                    key={k}
                    title={checkOccurrence(v.votes, 4 - k)}
                    onClick={() => {
                      navigator.clipboard.writeText(v?.day);
                      handleClick(v?._id, 4 - k);
                    }}
                  >
                    <div className="flex flex-row justify-center min-w-[40px]">
                      <div
                        className={` rounded-full max-w-[40px] max-h-[40px] `}
                        style={{
                          backgroundColor: e?.color,
                          width: checkOccurrence(v.votes, 4 - k),
                          height: checkOccurrence(v.votes, 4 - k),
                        }}
                        key={i}
                      />
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          );
        })}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box>
          <List>
            {toShow.map((e: any, i: any) => {
              return (
                <ListItem key={i} style={{ width: "40vw" }}>
                  <ListItemButton className="flex flex-row gap-5 justify-between">
                    <div className="flex flex-row gap-5 items-center">
                      <Avatar src={e?.avatar} />
                      <div className="flex flex-row gap-5 items-center">
                        <div className="min-w-[150px]">
                          <Typography className="font-primary font-bold m-0">
                            {e?.userName}
                          </Typography>
                          <Typography className="font-primary m-0">
                            {e?.phoneNumber}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      {usersVotes?.find((a) => a.ownerId === e?._id)?.vote &&
                        moods_[
                          usersVotes?.find((a) => a.ownerId === e?._id).vote
                        ].icon}
                      {usersVotes.filter((a) => a.ownerId === e?._id).length >
                        1 && (
                        <Typography className="font-primary m-0">
                          x
                          {
                            usersVotes.filter((a) => a.ownerId === e?._id)
                              .length
                          }
                        </Typography>
                      )}
                      {console.log(
                        usersVotes.find((a) => a.ownerId === e?._id)
                      )}
                    </div>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Dialog>
    </div>
  );
};
export default Barometer;
