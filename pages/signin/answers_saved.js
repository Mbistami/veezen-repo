import React from "react";
import VeezenContainer from "../../components/VeezenContainer";
import { LinearProgress, Typography } from "@mui/material";

export const answers_saved = ({ state }) => {
  return (
    <VeezenContainer title="Answers recorded!">
      <div style={{ textAlign: "center" }}>
        <br />
        {!state && <p style={{ color: "#8F8D8D" }}>Loading...</p>}
        {state !== "" &&
          state?.split("\n").map((e, i) => (
            <Typography key={i} variant="subtitle1">
              {e}
            </Typography>
          ))}
        {state !== "" && <LinearProgress />}
      </div>
    </VeezenContainer>
  );
};
export default answers_saved;
