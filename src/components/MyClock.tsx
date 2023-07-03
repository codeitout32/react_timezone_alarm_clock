import React from "react";
import DayJs from "dayjs";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const MyClock = ({ time = new Date() }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h3">
        {DayJs(time).tz().format("HH : mm : ss")}{" "}
      </Typography>
    </Box>
  );
};

export default MyClock;
