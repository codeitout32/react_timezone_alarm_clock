import {
  Box,
  Button,
  Paper,
  Typography,
  Input,
  Switch,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import dayjs from "dayjs";
const AddAlarm = ({ setAlarm }) => {
  const [value, onChange] = useState({
    dateTime: new Date(),
    time: "10:00",
    date: "",
    repeat: false,
    days: {
      mon: true,
      tue: false,
      wed: true,
      thu: false,
      fri: false,
      sat: true,
      sun: true,
    },
  });

  console.log(value, "date");
  return (
    <Paper sx={{ my: 4, padding: 1 }}>
      <Typography> Add Alarm: </Typography>
      {/* <TimePicker
  label="Controlled picker"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/> */}
      <Box sx={{}}>
        <TimePicker
          onChange={(s) => onChange((state) => ({ ...state, time: s }))}
          value={value.time}
        />
        <Input
          sx={{ mx: 2 }}
          type="date"
          value={value.date}
          onChange={(e) =>
            onChange((state) => ({ ...state, date: e.target.value }))
          }
        />
        <FormControlLabel
          control={<Switch />}
          label="Repeat"
          checked={value.repeat}
          onChange={(e) =>
            onChange((state) => ({ ...state, repeat: e.target.checked }))
          }
        />
        <Button
          onClick={() => {
            const dateTime = dayjs.tz(`${value.date} ${value.time}`);
            setAlarm({ ...value, dateTime });
          }}
          variant="contained"
          sx={{ mx: 2 }}
        >
          Add Alarm
        </Button>
      </Box>
    </Paper>
  );
};

export default AddAlarm;
